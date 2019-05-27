"use strict";

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use("Factory");
const Role = use("Role");
const RoleSlugs = require("../../app/Enum/RoleSlugs");

let fruitDetails = {
  MG: {
    name: {
      en: "Mango",
      vi: "Xoài"
    }
  },
  DF: {
    name: {
      en: "Dragonfruit",
      vi: "Thanh Long"
    }
  },
  AV: {
    name: {
      en: "Avocado",
      vi: "Bơ"
    }
  },
  OR: {
    name: {
      en: "Orange",
      vi: "Cam"
    }
  },
  WM: {
    name: {
      en: "Watermelon",
      vi: "Dưa Hấu"
    }
  },
  DU: {
    name: {
      en: "Durian",
      vi: "Sầu riêng"
    }
  },
  GF: {
    name: {
      en: "Grapefruit",
      vi: "Bưởi"
    }
  },
  AP: {
    name: {
      en: "Apple",
      vi: "Táo"
    }
  }
};

let productDetails = {
  1: {
    name: {
      en: "Cat Chu Mango",
      vi: "Xoài Cát Chu"
    },
    description: ""
  },
  2: {
    name: {
      en: "Hoa Loc Mango",
      vi: "Xoài Hoà Lộc"
    },
    description: ""
  },
  3: {
    name: {
      en: "Tuong Mango",
      vi: "Xoài Tượng"
    },
    description: ""
  },
  4: {
    name: {
      en: "Green Drangonfruit",
      vi: "Thanh Long Xanh"
    },
    description: ""
  },
  5: {
    name: {
      en: "Yellow Dragonfruit",
      vi: "Thanh Long Vàng"
    },
    description: ""
  },
  6: {
    name: {
      en: "Sap Avocado",
      vi: "Bơ Sáp"
    },
    description: ""
  },
  7: {
    name: {
      en: "Deo Avocado",
      vi: "Bơ Dẻo"
    },
    description: ""
  },
  8: {
    name: {
      en: "Sanh Orange",
      vi: "Cam Sành"
    },
    description: ""
  },
  9: {
    name: {
      en: "Su Orange",
      vi: "Cam Sứ"
    },
    description: ""
  },
  10: {
    name: {
      en: "Yellow Watermelon",
      vi: "Dưa Hấu Vàng"
    },
    description: ""
  },
  11: {
    name: {
      en: "Green Watermelon",
      vi: "Dưa Hấu Xanh"
    },
    description: ""
  },
  12: {
    name: {
      en: "Small Seed Durian",
      vi: "Sầu Riêng Hột Lép"
    },
    description: ""
  },
  13: {
    name: {
      en: "Thai Durian",
      vi: "Sầu Riêng Thái"
    },
    description: ""
  },
  14: {
    name: {
      en: "Five Roi Grapefruit",
      vi: "Bưởi Năm Roi"
    },
    description: ""
  },
  15: {
    name: {
      en: "Blue Grapefruit",
      vi: "Bưởi Xanh"
    },
    description: ""
  },
  16: {
    name: {
      en: "Red Apple",
      vi: "Táo đỏ"
    },
    description: ""
  },
  17: {
    name: {
      en: "Green Apple",
      vi: "Táo xanh"
    },
    description: ""
  }
};

let allFruitType = [
  { id: "MG", products: ["1", "2", "3"] },
  { id: "DF", products: ["4", "5"] },
  { id: "AV", products: ["6", "7"] },
  { id: "OR", products: ["8", "9"] },
  { id: "WM", products: ["10", "11"] },
  { id: "DU", products: ["12", "13"] },
  { id: "GF", products: ["14", "15"] },
  { id: "AP", products: [] }
];

let users = [
  {
    username: "tuyetla",
    password: "111111",
    firstname: "IBL",
    lastname: "Admin",
    role: "operator",
    email: "tuyetla@blockchainlabs.asia",
    address: "182 Lê Đại Hành, Quận 11, Thành Phố Hồ Chí Minh",
    phone: "01287710277",
    code: "FCTL",
    fruitTypes: []
  },
  {
    username: "demo",
    password: "111111",
    firstname: "HTX",
    lastname: "Demo",
    role: "producer",
    email: "demo@gmail.com",
    address: "123 Hàng Bài, Hà Nội",
    phone: "673924486",
    code: "FCDM",
    etherAddress: '0xb51E3bB21697918521Dd4B5260D591497Aed5ECC',
    fruitTypes: allFruitType
  },
  {
    username: "nhunguyen",
    password: "111111",
    firstname: "HTX",
    lastname: "Quỳnh Như",
    role: "producer",
    email: "nguyenquynhnhu@gmail.com",
    address: "6/21 Lê Quang Sung, Quận 6, Thành Phố Hồ Chí Minh",
    phone: "01287710277",
    code: "FCQN",
    fruitTypes: [
      { id: "AV", products: ["6", "7"] },
      { id: "OR", products: ["8", "9"] }
    ]
  },
  {
    username: "myxuong",
    password: "111111",
    firstname: "HTX",
    lastname: "Mỹ Xương",
    role: "producer",
    email: "htxxoaimyxuongcaolanh@mail.com",
    address:
      "637, Khu Dân Cư Trung Tâm, Ấp Mỹ Thới, Xã Mỹ Xuơng, Huyện Cao Lãnh, Tỉnh Đồng Tháp",
    phone: "673924486",
    code: "FCMX",
    fruitTypes: [
      { id: "MG", products: ["1", "2", "3"] },
      { id: "DF", products: ["4", "5"] },
      { id: "WM", products: ["10", "11"] },
      { id: "DU", products: ["12", "13"] }
    ]
  },
  {
    username: "khoavo",
    password: "111111",
    firstname: "HTX",
    lastname: "Con Nai Vàng",
    role: "producer",
    email: "khoavmd@blockchainlabs.asia",
    address: "7 Khu Dân Cư Trung Sơn, Quận 7, Thành Phố Hồ Chí Minh",
    phone: "0908123456",
    code: "FCKV",
    fruitTypes: [
      { id: "MG", products: ["1", "2", "3"] },
      { id: "DF", products: ["4", "5"] },
      { id: "GF", products: ["14", "15"] },
      { id: "AP", products: [] }
    ]
  },
  {
    username: "namnguyen",
    password: "111111",
    firstname: "NPP",
    lastname: "Nông Trại Xanh",
    role: "distributor",
    email: "greenfarmvn@gmail.com",
    address:
      "Tòa nhà Packsimex, số 52 Đông Du, Phường Bến Nghé, Quận 1,Thành Phố Hồ Chí Minh",
    phone: "073022888",
    code: "FCNN",
    fruitTypes: allFruitType
  },
  {
    username: "congvo",
    password: "111111",
    firstname: "NPP",
    lastname: "Hồng Công",
    role: "distributor",
    email: "hongkongcomanyd@exp.hk.com",
    address: "225-227 Nguyễn Trãi, Quận 5, Thành Phố Hồ Chí Minh",
    phone: "0908999999",
    code: "FCHK",
    fruitTypes: allFruitType
  },
  {
    username: "huyvu",
    password: "111111",
    firstname: "NPP",
    lastname: "Huy Vũ",
    role: "distributor",
    email: "daithanhphatxnk@gmail.com",
    address: "Số 5, Hàng Bài, Hà Nội",
    phone: "908789076",
    code: "FCHV",
    fruitTypes: allFruitType
  },
  {
    username: "phuongpham",
    password: "111111",
    firstname: "NPP",
    lastname: "Minh Phương",
    role: "distributor",
    email: "minhphuongcoop@gmail.com",
    address: "Ấp Mỹ Thuận, Bình Thuận",
    phone: "0989123876",
    code: "FCMP",
    fruitTypes: allFruitType
  },
  {
    username: "tando",
    password: "111111",
    firstname: "Vin",
    lastname: "Mart",
    role: "retailer",
    email: "vominhdangkhoa85@gmail.com",
    address:
      "Số 1231, Khu phố 5, Đường quốc lộ 1A, Phường Bình trị Đông B, Quận Bình Tân, Thành Phố Hồ Chí Minh, Việt Nam",
    phone: "0907888888",
    code: "FCVM",
    fruitTypes: []
  },
  {
    username: "anhnguyen",
    password: "111111",
    firstname: "Coopmart",
    lastname: "Extra",
    role: "retailer",
    email: "coopmart@gmail.com",
    address:
      "199-205 Nguyễn Thái Học, Phường Phạm Ngũ Lão, Quận 1, Thành Phố Hồ Chí Minh",
    phone: "0908555555",
    code: "FCCE",
    fruitTypes: []
  },
  {
    username: "phuongnguyen",
    password: "111111",
    firstname: "Lotte",
    lastname: "Mart",
    role: "retailer",
    email: "lottemart@gmail.com",
    address: "2 Nguyễn Văn Linh, Quận 7, Thành Phố Hồ Chí Minh",
    phone: "0907888111",
    code: "FCLM",
    fruitTypes: []
  },
  {
    username: "thuykieu",
    password: "111111",
    firstname: "Vin",
    lastname: "Home",
    role: "producer",
    email: "user1@gmail.com",
    address: "2 Nguyễn Văn Linh, Quận 7, Thành Phố Hồ Chí Minh",
    phone: "0907888222",
    code: "FCAB",
    fruitTypes: allFruitType,
    activeBlockchain: false,
    backend_only: true
  },
  {
    username: "thuyvan",
    password: "111111",
    firstname: "Vin",
    lastname: "House",
    role: "producer",
    email: "user2@gmail.com",
    address: "2 Nguyễn Văn Linh, Quận 7, Thành Phố Hồ Chí Minh",
    phone: "0907888333",
    code: "FCAC",
    fruitTypes: allFruitType,
    activeBlockchain: false,
    backend_only: true
  },
  {
    username: "kimtrong",
    password: "111111",
    firstname: "Vin",
    lastname: "Group",
    role: "producer",
    email: "user3@gmail.com",
    address: "2 Nguyễn Văn Linh, Quận 7, Thành Phố Hồ Chí Minh",
    phone: "0907888444",
    code: "FCAD",
    fruitTypes: allFruitType,
    activeBlockchain: false,
    backend_only: true
  },
  {
    username: "thucsinh",
    password: "111111",
    firstname: "Vin",
    lastname: "Food",
    role: "retailer",
    email: "user4@gmail.com",
    address: "2 Nguyễn Văn Linh, Quận 7, Thành Phố Hồ Chí Minh",
    phone: "0907888555",
    code: "FCAE",
    fruitTypes: [],
    activeBlockchain: false,
    backend_only: true
  },
  {
    username: "hoanthu",
    password: "111111",
    firstname: "Vin",
    lastname: "Food",
    role: "distributor",
    email: "user5@gmail.com",
    address: "2 Nguyễn Văn Linh, Quận 7, Thành Phố Hồ Chí Minh",
    phone: "0907888666",
    code: "FCAF",
    fruitTypes: [],
    activeBlockchain: false,
    backend_only: true
  },
  {
    username: "operator",
    password: "111111",
    firstname: "Operator",
    lastname: "IBL",
    role: "operator",
    email: "fruitchain@blockchainlabs.asia",
    address: "182 Le Dai Hanh Street, Ward 5, District 11, Ho Chi Minh City",
    phone: "0787710277",
    code: "FCOP",
    fruitTypes: []
  },
  {
    username: "producer.myxuong",
    password: "111111",
    firstname: "Producer",
    lastname: "My Xuong",
    role: "producer",
    email: "myxuongfarm@maildrop.cc",
    address:
      "My Thoi Hamlet, My Xuong Village, Cao Lanh District, Dong Thap Province",
    phone: "0938247147",
    code: "FCPX",
    fruitTypes: allFruitType
  },
  {
    username: "distributor1",
    password: "111111",
    firstname: "Distributor",
    lastname: "1",
    role: "distributor",
    email: "distributor1@maildrop.cc",
    address: "123 Phan Van Hon Street, Ward 10, District 12, Ho Chi Minh City",
    phone: "0989123876",
    code: "FCD1",
    fruitTypes: allFruitType
  },
  {
    username: "distributor2",
    password: "111111",
    firstname: "Distributor",
    lastname: "2",
    role: "distributor",
    email: "distributor2@maildrop.cc",
    address: "45 Tran Phu Street, Hai Chau District, Da Nang City",
    phone: "0908123456",
    code: "FCD2",
    fruitTypes: allFruitType
  },
  {
    username: "retailer.hochiminh",
    password: "111111",
    firstname: "Retailer",
    lastname: "Ho Chi Minh",
    role: "retailer",
    email: "retailerHCM@maildrop.cc",
    address: "77 Nguyen Thi Thap Street, Ward 10, District 7, Ho Chi Minh City",
    phone: "01287710277",
    code: "RHCM",
    fruitTypes: allFruitType
  },
  {
    username: "retailer.hanoi",
    password: "111111",
    firstname: "Retailer",
    lastname: "Ha Noi",
    role: "retailer",
    email: "retailerHN@maildrop.cc",
    address:
      "678 Ngo Quyen Street, Dich Vong Ward, Hoan Mai District, Ha Noi City",
    phone: "0908999999",
    code: "RTHN",
    fruitTypes: allFruitType
  }
];

class AgriTechSeederAsync {
  async seedings() {
    // Add fruit type
    let productTypes = []
    for (let fruit in fruitDetails) {
      const product = await Factory.model("App/Models/ProductType").create({
        code: fruit,
        name: fruitDetails[fruit].name.en
      });
      productTypes.push(product.toJSON())
    }

    // Create role for users
    const ROLE_OPERATOR = await this.createOperatorRole();
    const ROLE_PRODUCER = await this.createProducerRole();
    const ROLE_DISTRIBUTOR = await this.createDistributorRole();
    const ROLE_RETAILER = await this.createRetailerRole();

    const ROLES = {
      operator: ROLE_OPERATOR,
      producer: ROLE_PRODUCER,
      distributor: ROLE_DISTRIBUTOR,
      retailer: ROLE_RETAILER
    };

    for (let i = 0; i < users.length; i++) {
      let user = users[i];
      // console.log(user.email)
      let userModel = await Factory.model("App/Models/User").create(user);
      await userModel.roles().attach(ROLES[user.role].id);

      for (let j = 0; j < user.fruitTypes.length; j++) {
        const product = productTypes.find((p) => (p.code === user.fruitTypes[j].id))
        await Factory.model("App/Models/UserProductType").create({
          userId: userModel.id,
          productCode: product.code
        })
      }
    }

  }

  async createOperatorRole() {
    return await Role.findOrCreate(
      {
        slug: RoleSlugs.OPERATOR
      },
      {
        name: "Operator",
        slug: RoleSlugs.OPERATOR,
        description: "manage operator privileges"
      }
    );
  }

  async createProducerRole() {
    return await Role.findOrCreate(
      {
        slug: RoleSlugs.PRODUCER
      },
      {
        name: "Producer",
        slug: RoleSlugs.PRODUCER,
        description: "manage producer privileges"
      }
    );
  }

  async createDistributorRole() {
    return await Role.findOrCreate(
      {
        slug: RoleSlugs.DISTRIBUTOR
      },
      {
        name: "Distributor",
        slug: RoleSlugs.DISTRIBUTOR,
        description: "manage distributor privileges"
      }
    );
  }

  async createRetailerRole() {
    return await Role.findOrCreate(
      {
        slug: RoleSlugs.RETAILER
      },
      {
        name: "Retailer",
        slug: RoleSlugs.RETAILER,
        description: "manage retailer privileges"
      }
    );
  }
}

module.exports = AgriTechSeederAsync;
