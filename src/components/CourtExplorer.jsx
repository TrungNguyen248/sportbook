import React, { useState } from "react";
import {
  Search,
  MapPin,
  Activity,
  ArrowRight,
  Phone,
  CircleStar,
  User,
  Map,
} from "lucide-react";
import { courts, regions, sportTypes } from "../data/mockData";

export default function CourtExplorer() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedSport, setSelectedSport] = useState("");

  // 1. Lọc sân theo điều kiện tìm kiếm
  const filteredCourts = courts.filter((court) => {
    const matchName = court.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchRegion = selectedRegion
      ? court.regionId === selectedRegion
      : true;
    const matchSport = selectedSport ? court.type === selectedSport : true;

    return matchName && matchRegion && matchSport;
  });

  // 2. Nhóm các sân đã lọc theo khu vực (Region)
  const groupedCourts = regions
    .map((region) => {
      return {
        ...region,
        courts: filteredCourts.filter((c) => c.regionId === region.id),
      };
    })
    .filter((region) => region.courts.length > 0); // Chỉ giữ lại những khu vực có sân

  // Hàm format tiền
  const formatPrice = (price) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);

  return (
    <div className="space-y-12">
      {/* Bộ lọc Tìm kiếm */}
      <div className="bg-white p-6 border border-zinc-200 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-3.5 h-5 w-5 text-zinc-400" />
          <input
            type="text"
            placeholder="TÌM TÊN SÂN..."
            className="w-full pl-12 pr-4 py-3 bg-zinc-50 border border-zinc-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-zinc-900 font-bold placeholder:text-zinc-400 uppercase tracking-wider text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="w-full md:w-64 relative">
          <Map className="absolute left-4 top-3.5 h-5 w-5 text-zinc-400" />
          <select
            className="w-full pl-12 pr-4 py-3 bg-zinc-50 border border-zinc-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 appearance-none outline-none text-zinc-900 font-bold uppercase tracking-wider text-sm cursor-pointer"
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
          >
            <option value="">TẤT CẢ KHU VỰC</option>
            {regions.map((reg) => (
              <option key={reg.id} value={reg.id}>
                {reg.name}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full md:w-56 relative">
          <CircleStar className="absolute left-4 top-3.5 h-5 w-5 text-zinc-400" />
          <select
            className="w-full pl-12 pr-4 py-3 bg-zinc-50 border border-zinc-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 appearance-none outline-none text-zinc-900 font-bold uppercase tracking-wider text-sm cursor-pointer"
            value={selectedSport}
            onChange={(e) => setSelectedSport(e.target.value)}
          >
            <option value="">TẤT CẢ MÔN</option>
            {sportTypes.map((sport) => (
              <option key={sport} value={sport}>
                {sport}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Hiển thị danh sách sân theo từng Nhóm Khu Vực */}
      <div className="space-y-12">
        {groupedCourts.length > 0 ? (
          groupedCourts.map((group) => (
            <div key={group.id} className="space-y-6">
              <div className="flex items-center gap-3 border-b-2 border-zinc-200 pb-2">
                <MapPin className="h-6 w-6 text-emerald-500" />
                <h2 className="text-2xl font-black text-zinc-900 uppercase tracking-tight">
                  {group.name}
                </h2>
                <span className="ml-auto bg-zinc-900 text-emerald-400 text-xs font-black px-3 py-1 uppercase tracking-wider">
                  {group.courts.length} Sân
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {group.courts.map((court) => (
                  <div
                    key={court.id}
                    className="bg-white border border-zinc-200 flex flex-col hover:border-emerald-500 transition-colors group"
                  >
                    <div className="relative h-56 overflow-hidden bg-zinc-100">
                      <img
                        src={court.image}
                        alt={court.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-4 left-4 bg-zinc-900 text-white text-xs font-black px-3 py-1.5 uppercase tracking-wider">
                        {court.type}
                      </div>
                      <div className="absolute bottom-4 left-4 bg-emerald-500 text-white text-sm font-black px-3 py-1.5 uppercase tracking-wider shadow-lg">
                        {formatPrice(court.price)}{" "}
                        <span className="text-xs font-normal opacity-90">
                          / GIỜ
                        </span>
                      </div>
                    </div>

                    <div className="p-6 flex-grow flex flex-col">
                      <h3 className="text-xl font-black text-zinc-900 mb-3 leading-tight uppercase line-clamp-2">
                        {court.name}
                      </h3>

                      <div className="space-y-2 mb-6 flex-grow">
                        <div className="flex items-start text-sm text-zinc-500 font-medium">
                          <MapPin className="h-4 w-4 mr-2 text-zinc-400 shrink-0 mt-0.5" />
                          <span className="line-clamp-2">{court.address}</span>
                        </div>
                        <div className="flex items-center text-sm text-zinc-500 font-medium">
                          <User className="h-4 w-4 mr-2 text-zinc-400 shrink-0" />
                          Quản lý:{" "}
                          <strong className="text-zinc-800 ml-1">
                            {court.ownerName}
                          </strong>
                        </div>
                        <div className="flex items-center text-sm text-zinc-500 font-medium">
                          <Phone className="h-4 w-4 mr-2 text-zinc-400 shrink-0" />
                          SĐT:{" "}
                          <strong className="text-emerald-600 ml-1">
                            {court.ownerPhone}
                          </strong>
                        </div>
                      </div>

                      <a
                        href={`/san/${court.id}`}
                        className="flex items-center justify-center w-full bg-zinc-100 text-zinc-900 font-black py-3 uppercase tracking-wider hover:bg-emerald-500 hover:text-white transition-colors"
                      >
                        ĐẶT LỊCH NGAY <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20 bg-white border border-zinc-200">
            <CircleStar className="h-12 w-12 text-zinc-300 mx-auto mb-4" />
            <h3 className="text-xl font-black text-zinc-400 uppercase tracking-widest">
              Không tìm thấy sân
            </h3>
            <p className="text-zinc-500 mt-2 font-medium">
              Vui lòng thử thay đổi bộ lọc hoặc tìm kiếm với từ khóa khác.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
