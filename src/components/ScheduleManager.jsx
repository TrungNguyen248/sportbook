import React, { useState, useEffect } from "react";
import {
  CalendarDays,
  Clock,
  User,
  Phone,
  CheckSquare,
  AlertCircle,
  Info,
} from "lucide-react";
import {
  getBookingsData,
  timeToMinutes,
  minutesToTime,
} from "../data/mockData";

export default function ScheduleManager({ court }) {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [bookings, setBookings] = useState([]);
  const [selectedStart, setSelectedStart] = useState("");
  const [duration, setDuration] = useState(60); // Mặc định 60 phút
  const [formData, setFormData] = useState({ name: "", phone: "" });
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    setBookings(getBookingsData());
  }, []);

  const dayBookings = bookings.filter(
    (b) => b.courtId === court.id && b.date === date,
  );

  const generateTimeBlocks = () => {
    const blocks = [];
    for (let m = 360; m <= 1320; m += 30) {
      blocks.push(m);
    }
    return blocks;
  };
  const timeBlocks = generateTimeBlocks();

  const isMinuteBooked = (minute) => {
    return dayBookings.some((b) => {
      const bStart = timeToMinutes(b.startTime);
      const bEnd = bStart + b.duration;
      return minute >= bStart && minute < bEnd;
    });
  };

  const checkAvailability = (startMin, dur) => {
    const endMin = startMin + dur;
    for (let m = startMin; m < endMin; m += 30) {
      if (isMinuteBooked(m)) return false;
    }
    return true;
  };

  useEffect(() => {
    if (selectedStart) {
      const startMin = timeToMinutes(selectedStart);
      if (!checkAvailability(startMin, duration)) {
        setErrorMsg(
          "Khung giờ bạn chọn bị trùng với lịch đã đặt. Vui lòng chọn giờ khác hoặc giảm thời lượng.",
        );
      } else {
        setErrorMsg("");
      }
    }
  }, [selectedStart, duration, date]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedStart)
      return setErrorMsg("Vui lòng chọn giờ bắt đầu trên bảng thời gian.");
    if (errorMsg) return;

    const newBooking = {
      id: `bk_${Date.now()}`,
      courtId: court.id,
      date,
      startTime: selectedStart,
      duration: parseInt(duration),
      ...formData,
      status: "Chờ thanh toán",
    };

    const updated = [...bookings, newBooking];
    localStorage.setItem("sport_bookings_v2", JSON.stringify(updated));
    window.location.href = "/lich-da-dat";
  };

  // TÍNH TOÁN HIỂN THỊ THÔNG TIN TÓM TẮT
  let endTimeStr = "";
  let totalPrice = 0;
  if (selectedStart && !errorMsg) {
    const startMin = timeToMinutes(selectedStart);
    endTimeStr = minutesToTime(startMin + duration);
    totalPrice = (court.price * duration) / 60; // Tính tiền dựa trên số phút
  }

  return (
    <div className="bg-white p-6 md:p-8 rounded-none border border-zinc-200 shadow-sm">
      <h2 className="text-2xl font-black text-zinc-900 uppercase tracking-tight mb-6 flex items-center gap-2 border-b-2 border-emerald-500 pb-3 inline-flex">
        <CalendarDays className="h-6 w-6 text-emerald-500" /> Đặt lịch sân
      </h2>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Hàng 1: Chọn ngày và Thời lượng */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-zinc-50 p-4 border border-zinc-200 focus-within:border-emerald-500 transition-colors">
            <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">
              Ngày đặt
            </label>
            <input
              type="date"
              required
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                setSelectedStart("");
              }}
              className="w-full bg-transparent outline-none text-zinc-900 font-black cursor-pointer"
            />
          </div>
          <div className="bg-zinc-50 p-4 border border-zinc-200 focus-within:border-emerald-500 transition-colors">
            <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">
              Thời lượng thuê
            </label>
            <select
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="w-full bg-transparent outline-none text-zinc-900 font-black cursor-pointer"
            >
              <option value={60}>1 TIẾNG</option>
              <option value={90}>1.5 TIẾNG</option>
              <option value={120}>2 TIẾNG</option>
              <option value={180}>3 TIẾNG</option>
            </select>
          </div>
        </div>

        {/* Hàng 2: Timeline Board */}
        <div>
          <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3">
            Bảng thời gian (Chọn giờ bắt đầu)
          </label>
          <div className="overflow-x-auto pb-4">
            <div className="flex gap-1 min-w-max">
              {timeBlocks.map((mins) => {
                const timeStr = minutesToTime(mins);
                const isBooked = isMinuteBooked(mins);

                let isSelectedBlock = false;
                if (selectedStart) {
                  const sMin = timeToMinutes(selectedStart);
                  if (mins >= sMin && mins < sMin + duration) {
                    isSelectedBlock = true;
                  }
                }

                let blockClass =
                  "flex-shrink-0 w-16 h-12 flex items-center justify-center text-xs font-bold border transition-colors cursor-pointer ";

                if (isBooked) {
                  blockClass +=
                    "bg-zinc-200 text-zinc-400 border-zinc-200 cursor-not-allowed";
                } else if (isSelectedBlock) {
                  blockClass +=
                    "bg-emerald-500 text-white border-emerald-600 shadow-inner";
                } else {
                  blockClass +=
                    "bg-white text-zinc-600 border-zinc-300 hover:border-emerald-500 hover:text-emerald-600";
                }

                return (
                  <button
                    key={mins}
                    type="button"
                    disabled={isBooked}
                    onClick={() => setSelectedStart(timeStr)}
                    className={blockClass}
                  >
                    {timeStr}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-6 mt-2 text-xs font-bold text-zinc-500 uppercase tracking-wider">
            <span className="flex items-center gap-2">
              <div className="w-4 h-4 bg-white border border-zinc-300"></div>{" "}
              Trống
            </span>
            <span className="flex items-center gap-2">
              <div className="w-4 h-4 bg-zinc-200"></div> Đã đặt
            </span>
            <span className="flex items-center gap-2">
              <div className="w-4 h-4 bg-emerald-500"></div> Đang chọn
            </span>
          </div>

          {errorMsg && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 text-red-600 text-sm font-bold uppercase tracking-wider flex items-center gap-2">
              <AlertCircle className="h-5 w-5" /> {errorMsg}
            </div>
          )}
        </div>

        {/* MỚI THÊM: BẢNG TÓM TẮT ĐẶT SÂN (Chỉ hiện khi đã chọn giờ hợp lệ) */}
        {selectedStart && !errorMsg && (
          <div className="bg-emerald-50 border-2 border-emerald-500 p-5 mt-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-emerald-500 text-white text-[10px] font-black px-2 py-1 uppercase tracking-widest">
              Đang giữ chỗ
            </div>
            <h4 className="text-emerald-800 font-black uppercase tracking-wider mb-4 text-sm flex items-center gap-2">
              <Info className="h-5 w-5" /> Thông tin lịch đặt của bạn
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-emerald-900">
              <div className="flex flex-col">
                <span className="text-xs font-bold uppercase tracking-wider opacity-70 mb-1">
                  Thời gian sử dụng sân
                </span>
                <span className="text-xl font-black">
                  {selectedStart}{" "}
                  <span className="text-emerald-500 mx-1">→</span> {endTimeStr}
                </span>
              </div>

              <div className="flex flex-col md:border-l-2 md:border-emerald-200 md:pl-4">
                <span className="text-xs font-bold uppercase tracking-wider opacity-70 mb-1">
                  Tổng thời lượng
                </span>
                <span className="text-xl font-black">{duration / 60} GIỜ</span>
              </div>

              <div className="flex flex-col md:border-l-2 md:border-emerald-200 md:pl-4">
                <span className="text-xs font-bold uppercase tracking-wider opacity-70 mb-1">
                  Tạm tính
                </span>
                <span className="text-xl font-black text-emerald-600">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(totalPrice)}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Hàng 3: Thông tin cá nhân */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-zinc-200 mt-6">
          <div>
            <label className="flex items-center text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">
              <User className="h-4 w-4 mr-2" /> Tên người đặt
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full bg-zinc-50 border-zinc-300 px-4 py-3 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 border outline-none font-semibold transition-colors"
              placeholder="NHẬP TÊN CỦA BẠN"
            />
          </div>
          <div>
            <label className="flex items-center text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">
              <Phone className="h-4 w-4 mr-2" /> Số điện thoại
            </label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="w-full bg-zinc-50 border-zinc-300 px-4 py-3 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 border outline-none font-semibold transition-colors"
              placeholder="09XX..."
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={!selectedStart || errorMsg !== ""}
          className="w-full flex items-center justify-center bg-zinc-900 hover:bg-emerald-600 text-white font-black uppercase tracking-widest py-4 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg mt-4"
        >
          <CheckSquare className="h-5 w-5 mr-2" /> Xác nhận đặt sân
        </button>
      </form>
    </div>
  );
}
