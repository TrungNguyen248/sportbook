// Danh mục khu vực
export const regions = [
  { id: "hn-cg", name: "Cầu Giấy, Hà Nội" },
  { id: "hn-tx", name: "Thanh Xuân, Hà Nội" },
  { id: "hcm-q1", name: "Quận 1, TP.HCM" },
  { id: "hcm-q7", name: "Quận 7, TP.HCM" },
];

// Danh mục loại thể thao
export const sportTypes = [
  "Bóng đá",
  "Pickleball",
  "Cầu lông",
  "Bóng rổ",
  "Bóng chuyền",
  "Tennis",
];

// Dữ liệu các sân (Các cơ sở kinh doanh)
export const courts = [
  {
    id: "f-cg-1",
    name: "Sân bóng đá Linh Đàm",
    type: "Bóng đá",
    regionId: "hn-cg",
    price: 300000,
    image: "/sport/bong_da/san_linh_dam/1.jpg",
    address: "112 Chùa Láng, Cầu Giấy, Hà Nội",
    ownerName: "Anh Tuấn",
    ownerPhone: "0901112223",
  },
  {
    id: "f-cg-2",
    name: "Sân bóng Phương Đông",
    type: "Bóng đá",
    regionId: "hn-cg",
    price: 350000,
    image: "/sport/bong_da/san_phuong_dong/1.jpg",
    address: "Khu tập thể Nghĩa Tân, Cầu Giấy, Hà Nội",
    ownerName: "Chú Hải",
    ownerPhone: "0912334455",
  },
  {
    id: "f-cg-2",
    name: "Sân bóng Thành Công",
    type: "Bóng đá",
    regionId: "hn-cg",
    price: 350000,
    image: "/sport/bong_da/san_thanh_cong/1.webp",
    address: "Khu tập thể Nghĩa Tân, Cầu Giấy, Hà Nội",
    ownerName: "Chú Hải",
    ownerPhone: "0912334455",
  },
  {
    id: "f-cg-2",
    name: "Sân bóng Văn Quán",
    type: "Bóng đá",
    regionId: "hn-cg",
    price: 350000,
    image: "/sport/bong_da/san_van_quan/1.jpg",
    address: "Khu tập thể Nghĩa Tân, Cầu Giấy, Hà Nội",
    ownerName: "Chú Hải",
    ownerPhone: "0912334455",
  },
  {
    id: "p-cg-1",
    name: "Pickleball MT",
    type: "Pickleball",
    regionId: "hn-cg",
    price: 150000,
    image: "/sport/pic/san_mt/1.webp",
    address: "Công viên Dịch Vọng, Cầu Giấy",
    ownerName: "Chị Lan",
    ownerPhone: "0988776655",
  },
  {
    id: "p-cg-1",
    name: "Pickleball Thành Phát",
    type: "Pickleball",
    regionId: "hn-cg",
    price: 150000,
    image: "/sport/pic/san_thanh_phat/1.jpg",
    address: "Công viên Dịch Vọng, Cầu Giấy",
    ownerName: "Chị Lan",
    ownerPhone: "0988776655",
  },
  {
    id: "b-tx-1",
    name: "Sân Cầu lông Thanh Xuân",
    type: "Cầu lông",
    regionId: "hn-tx",
    price: 120000,
    image: "/sport/cau_long/san_ha_dong/1.jpg",
    address: "Ngõ 11 Khuất Duy Tiến, Thanh Xuân",
    ownerName: "Anh Hoàng",
    ownerPhone: "0977665544",
  },
  {
    id: "b-tx-1",
    name: "Sân Cầu lông Thanh Xuân",
    type: "Cầu lông",
    regionId: "hn-tx",
    price: 120000,
    image: "/sport/cau_long/san_hoang_mai/1.webp",
    address: "Ngõ 11 Khuất Duy Tiến, Thanh Xuân",
    ownerName: "Anh Hoàng",
    ownerPhone: "0977665544",
  },
  {
    id: "b-tx-1",
    name: "Sân Cầu lông Thanh Xuân",
    type: "Cầu lông",
    regionId: "hn-tx",
    price: 120000,
    image: "/sport/cau_long/san_my_dinh/1.jpg",
    address: "Ngõ 11 Khuất Duy Tiến, Thanh Xuân",
    ownerName: "Anh Hoàng",
    ownerPhone: "0977665544",
  },
  {
    id: "b-tx-1",
    name: "Sân Cầu lông Thanh Xuân",
    type: "Cầu lông",
    regionId: "hn-tx",
    price: 120000,
    image: "/sport/cau_long/san_trieu_khuc/1.webp",
    address: "Ngõ 11 Khuất Duy Tiến, Thanh Xuân",
    ownerName: "Anh Hoàng",
    ownerPhone: "0977665544",
  },
  {
    id: "br-q1-1",
    name: "Sân Bóng rổ Q1 Indoor",
    type: "Bóng rổ",
    regionId: "hcm-q1",
    price: 400000,
    image: "/sport/bong_ro/thpt_le_hong_phong/1.png",
    address: "Nhà văn hóa Thanh Niên, Quận 1",
    ownerName: "Ban Quản Lý",
    ownerPhone: "02838222333",
  },
  {
    id: "br-q1-1",
    name: "Sân Bóng rổ Q1 Indoor",
    type: "Bóng rổ",
    regionId: "hcm-q1",
    price: 400000,
    image: "/sport/bong_ro/trung_tam_junsport/1.webp",
    address: "Nhà văn hóa Thanh Niên, Quận 1",
    ownerName: "Ban Quản Lý",
    ownerPhone: "02838222333",
  },
  {
    id: "br-q1-1",
    name: "Sân Bóng rổ Q1 Indoor",
    type: "Bóng rổ",
    regionId: "hcm-q1",
    price: 400000,
    image: "/sport/bong_ro/truong_quoc_te_new_way/1.jpg",
    address: "Nhà văn hóa Thanh Niên, Quận 1",
    ownerName: "Ban Quản Lý",
    ownerPhone: "02838222333",
  },
  {
    id: "br-q1-1",
    name: "Sân bóng chuyền Đại học Công Đoàn",
    type: "Bóng chuyền",
    regionId: "hcm-q1",
    price: 400000,
    image: "/sport/bong_chuyen/dh_cong_doan/1.jpg",
    address: "Nhà văn hóa Thanh Niên, Quận 1",
    ownerName: "Ban Quản Lý",
    ownerPhone: "02838222333",
  },
  {
    id: "br-q1-1",
    name: "Sân bóng chuyền Đại học Công Đoàn",
    type: "Bóng chuyền",
    regionId: "hcm-q1",
    price: 400000,
    image: "/sport/bong_chuyen/ntd_hoang_mai/1.jpg",
    address: "Nhà văn hóa Thanh Niên, Quận 1",
    ownerName: "Ban Quản Lý",
    ownerPhone: "02838222333",
  },
  {
    id: "br-q1-1",
    name: "Sân bóng chuyền Đại học Công Đoàn",
    type: "Bóng chuyền",
    regionId: "hcm-q1",
    price: 400000,
    image: "/sport/bong_chuyen/san_ba_dinh/1.jpg",
    address: "Nhà văn hóa Thanh Niên, Quận 1",
    ownerName: "Ban Quản Lý",
    ownerPhone: "02838222333",
  },
  {
    id: "br-q1-1",
    name: "Sân tennis ",
    type: "Tennis",
    regionId: "hcm-q1",
    price: 400000,
    image: "/sport/tennis/KDT_X2A_linh_dam/1.webp",
    address: "Nhà văn hóa Thanh Niên, Quận 1",
    ownerName: "Ban Quản Lý",
    ownerPhone: "02838222333",
  },
];

// Hàm chuyển đổi giờ sang phút để tính toán (VD: "06:30" -> 390)
export const timeToMinutes = (timeStr) => {
  const [h, m] = timeStr.split(":").map(Number);
  return h * 60 + m;
};

// Hàm chuyển đổi phút sang giờ (VD: 390 -> "06:30")
export const minutesToTime = (mins) => {
  const h = Math.floor(mins / 60)
    .toString()
    .padStart(2, "0");
  const m = (mins % 60).toString().padStart(2, "0");
  return `${h}:${m}`;
};

// Dữ liệu lịch đã đặt (Dùng startTime và duration tính bằng phút)
// duration: 60 (1 tiếng), 90 (1.5 tiếng), 120 (2 tiếng)...
export const mockBookings = [
  {
    id: "mb1",
    courtId: "f-cg-1",
    date: "2026-03-04",
    startTime: "17:00",
    duration: 90,
    name: "Trần Văn B",
    phone: "0901234567",
    status: "Đã xác nhận",
  },
  {
    id: "mb2",
    courtId: "f-cg-1",
    date: "2026-03-04",
    startTime: "19:00",
    duration: 120,
    name: "Lê Thị C",
    phone: "0909876543",
    status: "Đã xác nhận",
  },
  {
    id: "mb3",
    courtId: "p-cg-1",
    date: "2026-03-05",
    startTime: "08:00",
    duration: 120,
    name: "Phạm D",
    phone: "0988777666",
    status: "Chờ thanh toán",
  },
];

export const getBookingsData = () => {
  if (typeof window !== "undefined") {
    const local = localStorage.getItem("sport_bookings_v2");
    if (local) return JSON.parse(local);
    localStorage.setItem("sport_bookings_v2", JSON.stringify(mockBookings));
  }
  return mockBookings;
};
