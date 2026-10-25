import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import {
  Bell,
  CheckCircle2,
  AlertCircle,
  Info,
  Check,
  Plus,
  X,
  Filter,
} from 'lucide-react';

export const NotificationsPage: React.FC = () => {
  const { notifications, markNotificationRead, markAllNotificationsRead, addNotification } = useData();
  const { currentUser } = useAuth();

  const isAdminOrFaculty = currentUser?.role === 'admin' || currentUser?.role === 'teacher';
  const role = currentUser?.role || 'admin';

  const [filterUnread, setFilterUnread] = useState(false);
  const [isNewNoticeOpen, setIsNewNoticeOpen] = useState(false);
  const [noticeTitle, setNoticeTitle] = useState('');
  const [noticeMsg, setNoticeMsg] = useState('');
  const [noticeType, setNoticeType] = useState<'info' | 'warning' | 'success'>('info');

  const myNotifications = notifications.filter(
    (n) => n.targetRoles.includes(role) || n.targetUserId === currentUser?.id
  );

  const displayedList = filterUnread
    ? myNotifications.filter((n) => !n.read)
    : myNotifications;

  const handlePostNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noticeTitle.trim() || !noticeMsg.trim()) return;

    addNotification({
      targetRoles: ['student', 'teacher', 'admin'],
      title: noticeTitle.trim(),
      message: noticeMsg.trim(),
      type: noticeType,
    });

    setIsNewNoticeOpen(false);
    setNoticeTitle('');
    setNoticeMsg('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#131313]">
            Announcements & Notifications
          </h1>
          <p className="text-xs text-[#62676B] mt-0.5">
            Institutional notices, assessment deadlines, and schedule circulars.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {isAdminOrFaculty && (
            <button
              onClick={() => setIsNewNoticeOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#F9A51B] hover:bg-[#E58E08] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Post Announcement</span>
            </button>
          )}

          <button
            onClick={markAllNotificationsRead}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white border border-[#DBDBD9] hover:bg-[#F3F3F1] text-[#131313] text-xs font-medium transition-colors cursor-pointer"
          >
            <Check className="w-3.5 h-3.5 text-[#23845B]" />
            <span>Mark All as Read</span>
          </button>
        </div>
      </div>

      {/* Filter bar */}
      <div className="bg-white rounded-xl border border-[#DBDBD9] p-4 shadow-2xs flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={() => setFilterUnread(false)}
            className={`px-3 py-1.5 rounded-lg font-medium cursor-pointer transition-colors ${
              !filterUnread ? 'bg-[#FFF2D7] text-[#131313] font-semibold' : 'text-[#62676B] hover:text-[#131313]'
            }`}
          >
            All Messages ({myNotifications.length})
          </button>
          <button
            onClick={() => setFilterUnread(true)}
            className={`px-3 py-1.5 rounded-lg font-medium cursor-pointer transition-colors ${
              filterUnread ? 'bg-[#FFF2D7] text-[#131313] font-semibold' : 'text-[#62676B] hover:text-[#131313]'
            }`}
          >
            Unread Only ({myNotifications.filter((n) => !n.read).length})
          </button>
        </div>

        <span className="text-[11px] text-[#919A9F]">Filtered by role: {role}</span>
      </div>

      {/* Notification list */}
      <div className="bg-white rounded-xl border border-[#DBDBD9] shadow-2xs divide-y divide-[#DBDBD9]/50 overflow-hidden">
        {displayedList.length === 0 ? (
          <div className="py-12 text-center text-xs text-[#919A9F]">
            No announcements found in this mailbox.
          </div>
        ) : (
          displayedList.map((n) => (
            <div
              key={n.id}
              onClick={() => markNotificationRead(n.id)}
              className={`p-4 sm:p-5 flex items-start gap-4 transition-colors cursor-pointer ${
                !n.read ? 'bg-[#FFF2D7]/30 hover:bg-[#FFF2D7]/50' : 'hover:bg-[#F9F9F8]'
              }`}
            >
              <div className="w-9 h-9 rounded-lg bg-white border border-[#DBDBD9] flex items-center justify-center shrink-0 mt-0.5">
                {n.type === 'success' && <CheckCircle2 className="w-4 h-4 text-[#23845B]" />}
                {n.type === 'warning' && <AlertCircle className="w-4 h-4 text-[#A66A00]" />}
                {n.type === 'info' && <Info className="w-4 h-4 text-[#F9A51B]" />}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="font-semibold text-sm text-[#131313] flex items-center gap-2">
                    {n.title}
                    {!n.read && (
                      <span className="w-2 h-2 rounded-full bg-[#F9A51B] inline-block" />
                    )}
                  </h4>
                  <span className="text-[11px] text-[#919A9F] shrink-0">
                    {new Date(n.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-xs text-[#62676B] mt-1 leading-relaxed">{n.message}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Post Notice Modal */}
      {isNewNoticeOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl border border-[#DBDBD9] max-w-lg w-full p-6 shadow-xl">
            <div className="flex items-center justify-between pb-4 border-b border-[#DBDBD9]">
              <h3 className="font-bold text-base text-[#131313]">Broadcast Announcement</h3>
              <button
                onClick={() => setIsNewNoticeOpen(false)}
                className="p-1 rounded-md text-[#62676B] hover:text-[#131313] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handlePostNotice} className="space-y-4 mt-4 text-xs">
              <div>
                <label className="block font-medium text-[#131313] mb-1">Notice Headline *</label>
                <input
                  type="text"
                  required
                  value={noticeTitle}
                  onChange={(e) => setNoticeTitle(e.target.value)}
                  placeholder="e.g. Schedule for Mid-Term Examinations"
                  className="w-full px-3 py-2 border border-[#DBDBD9] rounded-lg focus:outline-hidden focus:border-[#F9A51B]"
                />
              </div>

              <div>
                <label className="block font-medium text-[#131313] mb-1">Priority / Type</label>
                <select
                  value={noticeType}
                  onChange={(e) => setNoticeType(e.target.value as any)}
                  className="w-full px-3 py-2 border border-[#DBDBD9] rounded-lg focus:outline-hidden focus:border-[#F9A51B]"
                >
                  <option value="info">General Information</option>
                  <option value="warning">Important Warning / Schedule</option>
                  <option value="success">Academic Achievement / Result</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-[#131313] mb-1">Message Content *</label>
                <textarea
                  rows={4}
                  required
                  value={noticeMsg}
                  onChange={(e) => setNoticeMsg(e.target.value)}
                  placeholder="Provide comprehensive details for students and faculty..."
                  className="w-full px-3 py-2 border border-[#DBDBD9] rounded-lg focus:outline-hidden focus:border-[#F9A51B]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#DBDBD9]">
                <button
                  type="button"
                  onClick={() => setIsNewNoticeOpen(false)}
                  className="px-4 py-2 border border-[#DBDBD9] rounded-lg text-[#62676B] hover:bg-[#F3F3F1] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#F9A51B] hover:bg-[#E58E08] text-white font-semibold rounded-lg shadow-xs cursor-pointer"
                >
                  Broadcast Notice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
