import React, { useEffect, useState } from "react";
import {
  CalendarDays,
  Clock,
  MapPin,
  User,
  CheckCircle,
  Activity,
  CreditCard,
  Map,
  ExternalLink,
  PhoneCall,
  Phone,
} from "lucide-react";
import {
  getBookingsData,
  courts,
  regions,
  timeToMinutes,
  minutesToTime,
} from "../data/mockData";

export default function BookedList() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    setBookings(getBookingsData());
  }, []);

  if (bookings.length === 0) {
    return (
      <div className="text-center py-24 bg-white border border-zinc-200 shadow-sm mx-4 md:mx-0">
        <Activity className="h-12 w-12 text-zinc-300 mx-auto mb-4" />
        <h3 className="text-xl font-black text-zinc-400 uppercase tracking-widest">
          Chưa có lịch đặt nào
        </h3>
        <p className="text-zinc-500 mt-2 font-medium">
          Bạn chưa thực hiện giao dịch đặt sân nào trên hệ thống.
        </p>
      </div>
    );
  }

  const sortedBookings = [...bookings].reverse();
  const formatPrice = (price) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);

  return (
    <div className="bg-transparent md:bg-white md:border md:border-zinc-200 overflow-hidden md:shadow-sm">
      {/* 1. GIAO DIỆN MOBILE (DẠNG CARD) */}
      <div className="md:hidden flex flex-col gap-4">
        {sortedBookings.map((b) => {
          const court = courts.find((c) => c.id === b.courtId);
          const region = regions.find((r) => r.id === court?.regionId);

          let endTimeStr = "N/A";
          let totalPrice = 0;
          let mapUrl = "#";
          let telUrl = "#";

          if (court) {
            mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(court.address)}`;
            telUrl = `tel:${court.ownerPhone}`;
            if (b.startTime && b.duration) {
              const startMin = timeToMinutes(b.startTime);
              endTimeStr = minutesToTime(startMin + b.duration);
              totalPrice = (court.price * b.duration) / 60;
            }
          }

          return (
            <div
              key={`mobile-${b.id}`}
              className="bg-white border border-zinc-200 p-5 shadow-sm relative overflow-hidden"
            >
              {/* Trạng thái */}
              <div className="absolute top-0 right-0 bg-emerald-500 text-white text-[10px] font-black px-3 py-1.5 uppercase tracking-widest">
                {b.status || "Chờ xác nhận"}
              </div>

              {/* Tên sân & Khu vực */}
              <div className="pr-20 mb-4">
                <h3 className="font-black text-zinc-900 text-lg uppercase tracking-tight mb-1">
                  {court?.name || "Sân không xác định"}
                </h3>
                <div className="flex items-start text-xs text-zinc-500 font-bold">
                  <MapPin className="h-3.5 w-3.5 mr-1 text-emerald-500 shrink-0" />
                  <span className="line-clamp-2">{court?.address}</span>
                </div>
              </div>

              {/* Khối Thời gian */}
              <div className="bg-zinc-50 border border-zinc-200 p-3 mb-4">
                <div className="flex items-center text-sm font-black text-zinc-900 mb-2 uppercase tracking-wider">
                  <CalendarDays className="h-4 w-4 mr-2 text-emerald-500" />{" "}
                  Ngày: {b.date}
                </div>
                <div className="flex items-center text-xs font-bold text-zinc-600 uppercase tracking-widest">
                  <Clock className="h-3.5 w-3.5 mr-2 text-zinc-400" />
                  {b.startTime}{" "}
                  <span className="text-emerald-500 mx-1.5">→</span>{" "}
                  {endTimeStr}
                  <span className="ml-2 pl-2 border-l border-zinc-300 text-zinc-500">
                    {b.duration ? `${b.duration / 60}H` : ""}
                  </span>
                </div>
              </div>

              {/* Khối Nút chức năng (Bản đồ & Gọi chủ sân) */}
              {court && (
                <div className="flex gap-2 mb-4">
                  <a
                    href={mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center text-[10px] font-black uppercase tracking-widest bg-zinc-100 text-zinc-700 hover:bg-emerald-500 hover:text-white py-2.5 transition-colors border border-zinc-200"
                  >
                    <Map className="h-3.5 w-3.5 mr-1.5" /> Bản đồ
                  </a>
                  <a
                    href={telUrl}
                    className="flex-1 flex items-center justify-center text-[10px] font-black uppercase tracking-widest bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white py-2.5 transition-colors border border-emerald-200"
                  >
                    <PhoneCall className="h-3.5 w-3.5 mr-1.5" /> Lh:{" "}
                    {court.ownerPhone}
                  </a>
                </div>
              )}

              {/* Thông tin thanh toán & Người đặt */}
              <div className="flex items-end justify-between border-t border-zinc-100 pt-3">
                <div>
                  <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">
                    Người đặt
                  </div>
                  <div className="text-xs font-black text-zinc-800 uppercase flex items-center">
                    <User className="h-3 w-3 mr-1 text-zinc-400" /> {b.name}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-0.5">
                    Thanh toán
                  </div>
                  <div className="text-base font-black text-emerald-600 tracking-wider">
                    {formatPrice(totalPrice)}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 2. GIAO DIỆN DESKTOP (DẠNG BẢNG) */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full divide-y divide-zinc-200">
          <thead className="bg-zinc-900 text-white">
            <tr>
              <th className="px-6 py-5 text-left text-xs font-black uppercase tracking-widest">
                Thông tin sân
              </th>
              <th className="px-6 py-5 text-left text-xs font-black uppercase tracking-widest">
                Thời gian thuê
              </th>
              <th className="px-6 py-5 text-left text-xs font-black uppercase tracking-widest">
                Người đặt
              </th>
              <th className="px-6 py-5 text-left text-xs font-black uppercase tracking-widest">
                Thanh toán
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 bg-white">
            {sortedBookings.map((b) => {
              const court = courts.find((c) => c.id === b.courtId);
              const region = regions.find((r) => r.id === court?.regionId);

              let endTimeStr = "N/A";
              let totalPrice = 0;
              let mapUrl = "#";
              let telUrl = "#";

              if (court) {
                mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(court.address)}`;
                telUrl = `tel:${court.ownerPhone}`;
                if (b.startTime && b.duration) {
                  const startMin = timeToMinutes(b.startTime);
                  endTimeStr = minutesToTime(startMin + b.duration);
                  totalPrice = (court.price * b.duration) / 60;
                }
              }

              return (
                <tr
                  key={`desktop-${b.id}`}
                  className="hover:bg-zinc-50 transition-colors group"
                >
                  {/* CỘT 1: THÔNG TIN SÂN & NÚT */}
                  <td className="px-6 py-5">
                    <div className="font-black text-zinc-900 text-base uppercase tracking-tight mb-2 group-hover:text-emerald-600 transition-colors">
                      {court?.name || "Sân không xác định"}
                    </div>
                    <div className="flex items-start text-xs text-zinc-500 font-bold mb-3">
                      <MapPin className="h-4 w-4 mr-1.5 text-emerald-500 shrink-0" />
                      <span className="line-clamp-2 leading-relaxed">
                        {court?.address} <br /> ({region?.name})
                      </span>
                    </div>

                    {/* NÚT MỞ BẢN ĐỒ & GỌI ĐIỆN */}
                    {court && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        <a
                          href={mapUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-[10px] font-black uppercase tracking-widest bg-zinc-100 text-zinc-600 hover:bg-emerald-500 hover:text-white px-3 py-1.5 transition-colors border border-zinc-200 hover:border-emerald-500"
                        >
                          <Map className="h-3.5 w-3.5 mr-1.5" /> Bản đồ
                        </a>
                        <a
                          href={telUrl}
                          className="inline-flex items-center text-[10px] font-black uppercase tracking-widest bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white px-3 py-1.5 transition-colors border border-emerald-200 hover:border-emerald-600"
                        >
                          <PhoneCall className="h-3.5 w-3.5 mr-1.5" /> Gọi:{" "}
                          {court.ownerPhone}
                        </a>
                      </div>
                    )}
                  </td>

                  {/* CỘT 2: THỜI GIAN */}
                  <td className="px-6 py-5">
                    <div className="flex items-center text-sm font-black text-zinc-900 mb-3 uppercase tracking-wider">
                      <CalendarDays className="h-4 w-4 mr-2 text-emerald-500" />{" "}
                      {b.date}
                    </div>
                    <div className="flex items-center text-xs font-bold text-zinc-700 bg-zinc-100 inline-flex px-3 py-1.5 border border-zinc-200 uppercase tracking-widest">
                      <Clock className="h-3.5 w-3.5 mr-2 text-zinc-500" />
                      {b.startTime}{" "}
                      <span className="text-emerald-500 mx-1.5">→</span>{" "}
                      {endTimeStr}
                      <span className="ml-2 pl-2 border-l-2 border-zinc-300 text-zinc-500">
                        {b.duration ? `${b.duration / 60}H` : ""}
                      </span>
                    </div>
                  </td>

                  {/* CỘT 3: NGƯỜI ĐẶT */}
                  <td className="px-6 py-5">
                    <div className="flex items-center text-sm font-black text-zinc-900 mb-1.5 uppercase tracking-wider">
                      <User className="h-4 w-4 mr-2 text-zinc-400" /> {b.name}
                    </div>
                    <div className="text-xs font-bold text-zinc-500 pl-6 tracking-widest">
                      SĐT: <span className="text-emerald-600">{b.phone}</span>
                    </div>
                  </td>

                  {/* CỘT 4: TRẠNG THÁI & TỔNG TIỀN */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="inline-flex items-center px-2.5 py-1 text-[10px] font-black uppercase tracking-widest bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <CheckCircle className="h-3 w-3 mr-1.5" />{" "}
                        {b.status || "Chờ xác nhận"}
                      </span>
                    </div>
                    <div className="flex items-center text-sm font-black text-emerald-600 uppercase tracking-widest bg-emerald-500/10 inline-flex px-3 py-1.5">
                      <CreditCard className="h-4 w-4 mr-2 text-emerald-500" />
                      {formatPrice(totalPrice)}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
