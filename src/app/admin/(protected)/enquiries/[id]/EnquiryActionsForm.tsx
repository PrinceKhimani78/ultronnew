'use client';

import {
  Archive,
  Loader2,
  MessageSquarePlus,
  RotateCcw,
  Save,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import type {
  AdminRole,
  EnquiryPriority,
  EnquiryStatus,
} from '@/lib/supabase/types';

type Props = {
  enquiryId: string;
  currentStatus: EnquiryStatus;
  currentPriority: EnquiryPriority;
  isArchived: boolean;
  userRole: AdminRole;
};

export function EnquiryActionsForm({
  enquiryId,
  currentStatus,
  currentPriority,
  isArchived,
  userRole,
}: Props) {
  const router = useRouter();

  const [status, setStatus] = useState<EnquiryStatus>(currentStatus);
  const [priority, setPriority] = useState<EnquiryPriority>(currentPriority);
  const [noteText, setNoteText] = useState('');

  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [isArchiving, setIsArchiving] = useState(false);

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const isViewer = userRole === 'viewer';

  const handleUpdateStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isViewer) return;
    setIsUpdatingStatus(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const res = await fetch(`/api/admin/enquiries/${enquiryId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, priority }),
      });

      const data = await res.json();
      if (!res.ok || !data.success)
        throw new Error(data.message || 'Update failed.');

      setSuccessMsg('Status & Priority updated.');
      router.refresh();
    } catch (err: unknown) {
      setErrorMsg(
        err instanceof Error ? err.message : 'Failed to update enquiry.',
      );
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isViewer || !noteText.trim()) return;
    setIsAddingNote(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const res = await fetch('/api/admin/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ enquiryId, note: noteText }),
      });

      const data = await res.json();
      if (!res.ok || !data.success)
        throw new Error(data.message || 'Failed to add note.');

      setNoteText('');
      setSuccessMsg('Internal note added.');
      router.refresh();
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'Failed to add note.');
    } finally {
      setIsAddingNote(false);
    }
  };

  const handleToggleArchive = async () => {
    if (isViewer) return;
    setIsArchiving(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const res = await fetch(`/api/admin/enquiries/${enquiryId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ archive: !isArchived }),
      });

      const data = await res.json();
      if (!res.ok || !data.success)
        throw new Error(data.message || 'Archive action failed.');

      setSuccessMsg(isArchived ? 'Enquiry restored.' : 'Enquiry archived.');
      router.refresh();
    } catch (err: unknown) {
      setErrorMsg(
        err instanceof Error ? err.message : 'Failed to update archive status.',
      );
    } finally {
      setIsArchiving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Feedback Messages */}
      {errorMsg && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-xs font-semibold text-red-700">
          {errorMsg}
        </div>
      )}
      {successMsg && (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-xs font-semibold text-emerald-800">
          {successMsg}
        </div>
      )}

      {/* Status & Priority Management Form */}
      <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
        <h3 className="font-display text-sm font-bold text-slate-900 uppercase">
          Management Controls
        </h3>

        <form
          onSubmit={handleUpdateStatus}
          autoComplete="off"
          data-lpignore="true"
          data-form-type="other"
          className="space-y-4"
        >
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase">
              Status
            </label>
            <select
              value={status}
              disabled={isViewer || isUpdatingStatus}
              onChange={(e) => setStatus(e.target.value as EnquiryStatus)}
              data-lpignore="true"
              data-form-type="other"
              className="mt-1 block w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:border-[#035551] focus:bg-white focus:outline-hidden disabled:opacity-60"
            >
              <option value="new">New</option>
              <option value="reviewing">Reviewing</option>
              <option value="contacted">Contacted</option>
              <option value="qualified">Qualified</option>
              <option value="not_qualified">Not Qualified</option>
              <option value="converted">Converted</option>
              <option value="closed">Closed</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase">
              Priority
            </label>
            <select
              value={priority}
              disabled={isViewer || isUpdatingStatus}
              onChange={(e) => setPriority(e.target.value as EnquiryPriority)}
              data-lpignore="true"
              data-form-type="other"
              className="mt-1 block w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:border-[#035551] focus:bg-white focus:outline-hidden disabled:opacity-60"
            >
              <option value="low">Low</option>
              <option value="normal">Normal</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>

          {!isViewer && (
            <button
              type="submit"
              disabled={isUpdatingStatus}
              className="font-display flex w-full items-center justify-center gap-2 rounded-lg bg-[#035551] px-4 py-2.5 text-xs font-bold text-white uppercase shadow-xs hover:bg-[#023c39] disabled:opacity-60"
            >
              {isUpdatingStatus ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Save Controls
                </>
              )}
            </button>
          )}
        </form>
      </div>

      {/* Add Internal Note Form */}
      <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
        <h3 className="font-display text-sm font-bold text-slate-900 uppercase">
          Add Internal Note
        </h3>

        <form
          onSubmit={handleAddNote}
          autoComplete="off"
          data-lpignore="true"
          data-form-type="other"
          className="space-y-3"
        >
          <textarea
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            disabled={isViewer || isAddingNote}
            rows={3}
            data-lpignore="true"
            data-form-type="other"
            placeholder="Add internal notes visible only to Ultron administrators..."
            className="block w-full rounded-lg border border-slate-300 bg-slate-50 p-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#035551] focus:bg-white focus:outline-hidden disabled:opacity-60"
          />

          {!isViewer && (
            <button
              type="submit"
              disabled={isAddingNote || !noteText.trim()}
              className="font-display flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 bg-slate-100 px-4 py-2 text-xs font-bold text-slate-800 uppercase hover:bg-slate-200 disabled:opacity-50"
            >
              {isAddingNote ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <MessageSquarePlus className="h-4 w-4" />
                  Add Note
                </>
              )}
            </button>
          )}
        </form>
      </div>

      {/* Archive / Restore Action */}
      {!isViewer && (
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
          <button
            type="button"
            onClick={handleToggleArchive}
            disabled={isArchiving}
            className={`font-display flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-xs font-bold uppercase transition-all ${
              isArchived
                ? 'border border-teal-300 bg-teal-50 text-teal-800 hover:bg-teal-100'
                : 'border border-red-200 bg-red-50 text-red-700 hover:bg-red-100'
            }`}
          >
            {isArchiving ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : isArchived ? (
              <>
                <RotateCcw className="h-4 w-4" />
                Restore Lead
              </>
            ) : (
              <>
                <Archive className="h-4 w-4" />
                Archive Lead
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
