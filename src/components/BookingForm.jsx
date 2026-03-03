import React, { useState, useEffect } from "react";
import { Calendar, User, Phone, CheckCircle2 } from "lucide-react";
import { timeSlots, getBookingsData } from "../data/mockData";

export default function BookingForm({ court, location }) {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [selectedTime, setSelectedTime] = useState("");
  const [formData, setFormData] = useState({ name: "", phone: "" });
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    setBookings(getBookingsData());
  }, []);

  // Lọc ra các khung giờ đã bị đặt của sân này trong ngày được chọn
  const bookedSlots = bookings
    .filter((b) => b.courtId === court.id && b.date === date)
    .map((b) => b.time);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedTime) return alert("Vui lòng chọn một khung giờ!");

    const newBooking = {
      id: `b_${Date.now()}`,
      courtId: court.id,
      courtName: court.name,
      locationName: location.name,
      date,
      time: selectedTime,
      ...formData,
      status: "Đã xác nhận",
    };

    const updatedBookings = [...bookings, newBooking];
    localStorage.setItem("sport_bookings", JSON.stringify(updatedBookings));

    window.location.href = "/lich-da-dat";
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Chọn Ngày */}
      <div>
        <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
          <Calendar className="h-4 w-4 mr-2 text-indigo-500" /> Chọn ngày
        </label>
        <input
          type="date"
          required
          value={date}
          onChange={(e) => {
            setDate(e.target.value);
            setSelectedTime("");
          }}
          className="w-full border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 p-2.5 border outline-none"
        />
      </div>

      {/* Timeline hiển thị trạng thái giờ */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Khung giờ hoạt động
        </label>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          {timeSlots.map((time) => {
            const isBooked = bookedSlots.includes(time);
            const isSelected = selectedTime === time;

            let btnClass =
              "py-2.5 rounded-xl text-sm font-medium border transition-all text-center cursor-pointer ";
            if (isBooked) {
              btnClass +=
                "bg-gray-100 text-gray-400 border-gray-100 cursor-not-allowed";
            } else if (isSelected) {
              btnClass +=
                "bg-indigo-600 text-white border-indigo-600 shadow-md";
            } else {
              btnClass +=
                "bg-white text-gray-700 border-gray-200 hover:border-indigo-500 hover:text-indigo-600";
            }

            return (
              <button
                key={time}
                type="button"
                disabled={isBooked}
                onClick={() => setSelectedTime(time)}
                className={btnClass}
              >
                {time}
              </button>
            );
          })}
        </div>
        <div className="flex gap-4 mt-3 text-xs text-gray-500 justify-end">
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-white border border-gray-300"></span>{" "}
            Trống
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-gray-200"></span> Đã đặt
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-indigo-600"></span> Đang
            chọn
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
            <User className="h-4 w-4 mr-2 text-indigo-500" /> Họ và tên
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 p-2.5 border outline-none"
            placeholder="Nhập tên"
          />
        </div>
        <div>
          <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
            <Phone className="h-4 w-4 mr-2 text-indigo-500" /> Số điện thoại
          </label>
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            className="w-full border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 p-2.5 border outline-none"
            placeholder="09xx..."
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={!selectedTime}
        className="w-full flex items-center justify-center bg-gray-900 hover:bg-black text-white font-semibold py-3.5 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <CheckCircle2 className="h-5 w-5 mr-2" /> Xác nhận đặt sân
      </button>
    </form>
  );
}
