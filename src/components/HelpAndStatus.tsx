/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Check, ShieldCheck, Mail, Send, Activity, Info, Trophy, Sparkles } from 'lucide-react';

interface HelpAndStatusProps {
  activeModal: 'pro' | 'status' | 'help' | null;
  onClose: () => void;
}

export default function HelpAndStatus({ activeModal, onClose }: HelpAndStatusProps) {
  const [helpEmail, setHelpEmail] = useState('');
  const [helpMsg, setHelpMsg] = useState('');
  const [helpSubmitted, setHelpSubmitted] = useState(false);

  if (!activeModal) return null;

  const handleHelpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!helpEmail.trim() || !helpMsg.trim()) return;
    setHelpSubmitted(true);
    setTimeout(() => {
      setHelpSubmitted(false);
      setHelpEmail('');
      setHelpMsg('');
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all duration-300">
      <div 
        className="bg-[#121620] border border-slate-750 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl relative select-none animate-in fade-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* 1. Upgrade to Pro Modal */}
        {activeModal === 'pro' && (
          <div className="p-6 md:p-8">
            <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500 mb-4">
              <Trophy className="w-6 h-6" />
            </div>
            
            <h3 className="text-xl font-bold text-slate-100 mb-2 flex items-center gap-2">
              Upgrade to Compass Pro <Sparkles className="w-4 h-4 text-amber-400" />
            </h3>
            
            <p className="text-sm text-slate-400 mb-6 leading-relaxed">
              Nhận quyền truy cập trọn đời vào 30+ mẫu thiết kế nâng cao, các kịch bản load test k6, cấu hình CI/CD hoàn thiện cho Kubernetes và hỗ trợ trực tiếp.
            </p>

            <div className="space-y-3 mb-6">
              {[
                '30+ Python Backend Code Templates nâng cao',
                'Template deploy Kubernetes & Helm Charts',
                'Kịch bản Load Testing & Benchmark',
                'Hỗ trợ Code Review riêng tư qua Github'
              ].map((benefit, i) => (
                <div key={i} className="flex items-center text-xs text-slate-300 gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-emerald-500/15 flex items-center justify-center text-emerald-400 shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>{benefit}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-2">
              <button 
                onClick={() => {
                  alert("Tính năng Pro đang được kích hoạt thử nghiệm trong môi trường AI Studio!");
                  onClose();
                }}
                className="w-full py-2.5 px-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs rounded-xl cursor-pointer transition-colors"
              >
                Trở thành Thành viên Pro $19/Vĩnh viễn
              </button>
              <button 
                onClick={onClose}
                className="w-full py-2 px-4 bg-transparent text-slate-400 hover:text-slate-200 text-xs rounded-xl cursor-pointer"
              >
                Bỏ qua
              </button>
            </div>
          </div>
        )}

        {/* 2. System Status Modal */}
        {activeModal === 'status' && (
          <div className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-100">Hệ thống Trạng thái</h3>
                <p className="text-xs text-slate-500">Môi trường máy chủ offline-first</p>
              </div>
            </div>

            <p className="text-xs text-slate-400 mb-5 leading-relaxed">
              Giao diện chính và tập bản đồ dữ liệu của chúng tôi được lưu trữ cục bộ và phân phối tại Vercel Edge Server. Mọi dịch vụ phụ đều hoạt động lý tưởng.
            </p>

            <div className="space-y-3 mb-6 font-mono text-xs">
              <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800 flex justify-between items-center">
                <span className="text-slate-400">Edge Template Host</span>
                <span className="text-emerald-450 font-bold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  ONLINE
                </span>
              </div>
              <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800 flex justify-between items-center">
                <span className="text-slate-400">Database Engine State</span>
                <span className="text-emerald-450 font-bold flex items-center gap-1.5 text-[11px]">
                  STATIC IN-MEMORY
                </span>
              </div>
              <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800 flex justify-between items-center">
                <span className="text-slate-400">Response Latency</span>
                <span className="text-slate-300">1.2ms (Edge Node)</span>
              </div>
              <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800 flex justify-between items-center">
                <span className="text-slate-400">Active API SDK Compass</span>
                <span className="text-amber-500">v2.4.0 (Latest)</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-2 px-4 bg-slate-800 hover:bg-slate-700 text-slate-100 text-xs font-medium rounded-lg cursor-pointer transition-colors"
            >
              Hoàn thành
            </button>
          </div>
        )}

        {/* 3. Help Desk Modal */}
        {activeModal === 'help' && (
          <div className="p-6">
            <h3 className="text-base font-bold text-slate-100 mb-1 flex items-center gap-2">
              <Mail className="w-4.5 h-4.5 text-blue-400" />
              Help Desk / Hỗ trợ Kỹ thuật
            </h3>
            <p className="text-xs text-slate-400 mb-5 leading-relaxed">
              Bạn gặp khó khăn trong việc tích hợp các thư viện Python? Gửi phản hồi của bạn để đội ngũ kỹ thuật biên tập của chúng tôi giải đáp sớm nhất.
            </p>

            {helpSubmitted ? (
              <div className="p-8 text-center text-slate-300 flex flex-col items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-3">
                  <Check className="w-5 h-5" />
                </div>
                <h4 className="font-semibold text-sm mb-1 text-slate-100">Gửi phản hồi thành công!</h4>
                <p className="text-xs text-slate-550">Chúng tôi sẽ kiểm tra và phản hồi lại hòm thư của bạn.</p>
              </div>
            ) : (
              <form onSubmit={handleHelpSubmit} className="space-y-4">
                <div>
                  <label className="text-[11px] font-mono font-medium text-slate-400 block mb-1">
                    Địa chỉ Email của bạn
                  </label>
                  <input
                    type="email"
                    required
                    value={helpEmail}
                    onChange={(e) => setHelpEmail(e.target.value)}
                    placeholder="example@gmail.com"
                    className="w-full bg-slate-950 border border-slate-750 focus:border-blue-500 rounded-lg p-2.5 text-xs text-slate-200 outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono font-medium text-slate-400 block mb-1">
                    Nội dung câu hỏi / Góp ý
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={helpMsg}
                    onChange={(e) => setHelpMsg(e.target.value)}
                    placeholder="Ví dụ: Em muốn tích hợp PaddleOCR trên Docker mỏng bị thiếu thư viện libGL..."
                    className="w-full bg-slate-950 border border-slate-750 focus:border-blue-500 rounded-lg p-2.5 text-xs text-slate-200 outline-none resize-none"
                  />
                </div>

                <div className="flex gap-2 justify-end pt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 border border-slate-750 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded-lg text-xs cursor-pointer"
                  >
                    Hủy bỏ
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-slate-100 font-semibold rounded-lg text-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Gửi câu hỏi</span>
                    <Send className="w-3 h-3" />
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
