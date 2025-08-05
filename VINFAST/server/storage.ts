import { type User, type InsertUser, type InvestmentFund, type InsertInvestmentFund } from "@shared/schema";
import { randomUUID } from "crypto";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getAllInvestmentFunds(): Promise<InvestmentFund[]>;
  getInvestmentFund(id: string): Promise<InvestmentFund | undefined>;
  createInvestmentFund(fund: InsertInvestmentFund): Promise<InvestmentFund>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private investmentFunds: Map<string, InvestmentFund>;

  constructor() {
    this.users = new Map();
    this.investmentFunds = new Map();
    this.initializeInvestmentFunds();
  }

  private initializeInvestmentFunds() {
    const funds = [
      {
        name: "Quỹ Phát Triển Trạm Sạc DC 40kW",
        code: "DC40",
        dailyReturn: "0.15",
        duration: 30,
        minInvestment: "25.000.000 VNĐ",
        maxInvestment: "250.000.000 VNĐ",
        projectScale: "120 trạm sạc",
        progress: 88,
        category: "hạ tầng sạc",
        description: "Đầu tư vào hệ thống trạm sạc DC 40kW cơ bản cho xe điện VinFast",
        image: "/assets/quy-phat-trien-tram-sac-vinfast-dc-40kw.jpg",
        features: ["Công suất 40kW", "Chi phí thấp", "Phù hợp khởi đầu"]
      },
      {
        name: "Quỹ Phát Triển Trạm Sạc DC 60kW",
        code: "DC60",
        dailyReturn: "0.2",
        duration: 45,
        minInvestment: "50.000.000 VNĐ",
        maxInvestment: "500.000.000 VNĐ",
        projectScale: "100 trạm sạc",
        progress: 85,
        category: "hạ tầng sạc",
        description: "Đầu tư vào hệ thống trạm sạc DC 60kW cho xe điện VinFast",
        image: "/assets/quy-phat-trien-tram-sac-vinfast-dc-60kw.jpg",
        features: ["Công suất 60kW", "Thời gian sạc nhanh", "Tích hợp VinGroup"]
      },
      {
        name: "Quỹ Phát Triển Trạm Sạc DC 80kW",
        code: "DC80",
        dailyReturn: "0.25",
        duration: 60,
        minInvestment: "75.000.000 VNĐ",
        maxInvestment: "750.000.000 VNĐ",
        projectScale: "80 trạm sạc",
        progress: 82,
        category: "hạ tầng sạc",
        description: "Hệ thống trạm sạc DC 80kW công suất cao cho VinFast",
        image: "/assets/quy-phat-trien-tram-sac-vinfast-dc-80kw.jpg",
        features: ["Công suất 80kW", "Sạc siêu nhanh", "Công nghệ tiên tiến"]
      },
      {
        name: "Quỹ Phát Triển Trạm Sạc DC 120kW",
        code: "DC120",
        dailyReturn: "0.35",
        duration: 90,
        minInvestment: "150.000.000 VNĐ",
        maxInvestment: "1.500.000.000 VNĐ",
        projectScale: "60 trạm sạc",
        progress: 78,
        category: "hạ tầng sạc",
        description: "Trạm sạc siêu nhanh DC 120kW cho xe điện VinFast",
        image: "/assets/quy-phat-trien-tram-sac-vinfast-dc-120kw.jpg",
        features: ["120kW siêu nhanh", "Tương lai công nghệ", "Hiệu suất cao"]
      },
      {
        name: "Quỹ Phát Triển Trạm Sạc DC 150kW",
        code: "DC150",
        dailyReturn: "0.4",
        duration: 120,
        minInvestment: "200.000.000 VNĐ",
        maxInvestment: "2.000.000.000 VNĐ",
        projectScale: "40 trạm sạc",
        progress: 75,
        category: "hạ tầng sạc",
        description: "Hệ thống trạm sạc DC 150kW premium cho VinFast",
        image: "/assets/quy-phat-trien-tram-sac-vinfast-dc-150kw.jpg",
        features: ["150kW premium", "Công nghệ đỉnh cao", "Đầu tư cao cấp"]
      },
      {
        name: "Quỹ Phát Triển Công Nghệ 3D 300kW",
        code: "3D300",
        dailyReturn: "0.5",
        duration: 180,
        minInvestment: "500.000.000 VNĐ",
        maxInvestment: "5.000.000.000 VNĐ",
        projectScale: "25 trạm sạc",
        progress: 65,
        category: "công nghệ 3d",
        description: "Công nghệ sạc 3D 300kW cách mạng cho tương lai",
        image: "/assets/quy-phat-trien-tram-sac-vinfast-3d-300kw.jpg",
        features: ["Công nghệ 3D", "300kW cách mạng", "Tương lai xa"]
      },
      {
        name: "Quỹ Mô Hình Tích Lũy VinGroup",
        code: "TICH",
        dailyReturn: "0.25",
        duration: 365,
        minInvestment: "100.000.000 VNĐ",
        maxInvestment: "1.000.000.000 VNĐ",
        projectScale: "Toàn quốc",
        progress: 90,
        category: "tích lũy",
        description: "Quỹ phát triển hệ thống tích lũy điểm thưởng VinGroup cho VinFast",
        image: "/assets/quy-mo-the-tich-luy-vingroup.jpg",
        features: ["Tích hợp VinGroup", "Ưu đãi đặc biệt", "Phần thưởng tích lũy"]
      },
      {
        name: "Quỹ Phát Triển Gói Thương Gia",
        code: "THUONG",
        dailyReturn: "0.3",
        duration: 90,
        minInvestment: "250.000.000 VNĐ",
        maxInvestment: "2.500.000.000 VNĐ",
        projectScale: "150 trạm sạc",
        progress: 85,
        category: "gói thương",
        description: "Gói đầu tư trạm sạc VinFast dành cho doanh nghiệp và thương gia",
        image: "/assets/quy-phat-trien-tram-sac-vinfast-goi-thuong.jpg",
        features: ["Dành cho doanh nghiệp", "Lợi nhuận ổn định", "Dịch vụ premium"]
      },
      {
        name: "Quỹ Phát Triển Gói VIP",
        code: "VIP",
        dailyReturn: "0.4",
        duration: 120,
        minInvestment: "500.000.000 VNĐ",
        maxInvestment: "5.000.000.000 VNĐ",
        projectScale: "200 trạm sạc",
        progress: 80,
        category: "gói vip",
        description: "Gói đầu tư VIP với lợi nhuận cao và ưu tiên hàng đầu",
        image: "/assets/quy-phat-trien-tram-sac-vinfast-goi-vip.jpg",
        features: ["Lợi nhuận cao", "Ưu tiên VIP", "Hỗ trợ 24/7"]
      },
      {
        name: "Quỹ Phát Triển VIC01",
        code: "VIC01",
        dailyReturn: "0.6",
        duration: 180,
        minInvestment: "1.000.000.000 VNĐ",
        maxInvestment: "10.000.000.000 VNĐ",
        projectScale: "Cơ sở hạ tầng",
        progress: 75,
        category: "r&d",
        description: "Quỹ phát triển cơ sở hạ tầng trạm sạc VinFast toàn diện VIC01",
        image: "/assets/quy-phat-trien-tram-sac-vinfast-vic01.jpg",
        features: ["Hạ tầng toàn diện", "Quy mô lớn", "Đầu tư dài hạn"]
      },
      {
        name: "Quỹ Phát Triển VIC03",
        code: "VIC03",
        dailyReturn: "0.7",
        duration: 240,
        minInvestment: "1.500.000.000 VNĐ",
        maxInvestment: "15.000.000.000 VNĐ",
        projectScale: "Mạng lưới thông minh",
        progress: 70,
        category: "r&d",
        description: "Mạng lưới trạm sạc thông minh VinFast VIC03 với AI",
        image: "/assets/quy-phat-trien-tram-sac-vinfast-vic03.jpg",
        features: ["AI thông minh", "Mạng lưới kết nối", "Công nghệ 4.0"]
      },
      {
        name: "Quỹ Phát Triển VIC07",
        code: "VIC07",
        dailyReturn: "0.8",
        duration: 300,
        minInvestment: "2.500.000.000 VNĐ",
        maxInvestment: "25.000.000.000 VNĐ",
        projectScale: "Hệ thống Elite",
        progress: 65,
        category: "tương lai",
        description: "Hệ thống trạm sạc Elite cao cấp nhất VinFast VIC07",
        image: "/assets/quy-phat-trien-tram-sac-vinfast-vic07.jpg",
        features: ["Elite cao cấp", "Công nghệ đỉnh", "Lợi nhuận tối đa"]
      },
      {
        name: "Quỹ Phát Triển VIC16",
        code: "VIC16",
        dailyReturn: "1.0",
        duration: 365,
        minInvestment: "5.000.000.000 VNĐ",
        maxInvestment: "50.000.000.000 VNĐ",
        projectScale: "Siêu dự án",
        progress: 60,
        category: "siêu dự án",
        description: "Siêu dự án phát triển mạng lưới sạc VinFast VIC16 toàn cầu",
        image: "/assets/quy-phat-trien-tram-sac-vinfast-vic16.jpg",
        features: ["Siêu dự án", "Quy mô toàn cầu", "Lợi nhuận khủng"]
      },
      {
        name: "Quỹ Phát Triển VIC25",
        code: "VIC25",
        dailyReturn: "1.2",
        duration: 365,
        minInvestment: "10.000.000.000 VNĐ",
        maxInvestment: "100.000.000.000 VNĐ",
        projectScale: "Công nghệ tương lai",
        progress: 55,
        category: "siêu dự án",
        description: "Công nghệ sạc tương lai cho thế hệ xe điện mới VIC25",
        image: "/assets/quy-phat-trien-tram-sac-vinfast-vic25.jpg",
        features: ["Công nghệ tương lai", "Đầu tư khủng", "Lợi nhuận tối ưu"]
      }
    ];

    funds.forEach(fund => {
      const id = fund.code; // Sử dụng code làm id
      const now = new Date().toISOString();
      this.investmentFunds.set(id, { 
        ...fund, 
        id,
        maxInvestment: fund.maxInvestment || null,
        features: fund.features || null,
        createdAt: now,
        updatedAt: now
      });
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const now = new Date().toISOString();
    const user: User = { 
      ...insertUser, 
      id,
      createdAt: now,
      updatedAt: now
    };
    this.users.set(id, user);
    return user;
  }

  async getAllInvestmentFunds(): Promise<InvestmentFund[]> {
    return Array.from(this.investmentFunds.values());
  }

  async getInvestmentFund(id: string): Promise<InvestmentFund | undefined> {
    return this.investmentFunds.get(id);
  }

  async createInvestmentFund(insertFund: InsertInvestmentFund): Promise<InvestmentFund> {
    const id = randomUUID();
    const now = new Date().toISOString();
    const fund: InvestmentFund = { 
      ...insertFund, 
      id,
      maxInvestment: insertFund.maxInvestment || null,
      features: insertFund.features || null,
      createdAt: now,
      updatedAt: now
    };
    this.investmentFunds.set(id, fund);
    return fund;
  }
}

export const storage = new MemStorage();
