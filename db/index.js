const Sequelize = require("sequelize");
const db = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost/acme-react-redux"
);

const Member = db.define("member", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  lastName: {
    type: Sequelize.STRING,
    allowsNull: false,
  },
  firstName: {
    type: Sequelize.STRING,
    allowsNull: false,
  },
  contactNum: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
  },
  address: {
    type: Sequelize.STRING,
  },
  city: {
    type: Sequelize.STRING,
  },
  state: {
    type: Sequelize.STRING,
  },
  zip: {
    type: Sequelize.STRING,
  },
  joinDate: {
    type: Sequelize.DATEONLY,
  },
});

const Dues = db.define("dues", {
  paymentFor: {
    type: Sequelize.ENUM("Annual", "Monthly", "Event"),
    defaultValue: "Monthly",
  },
  paymentAmount: {
    type: Sequelize.INTEGER,
  },
  paymentDate: {
    type: Sequelize.DATEONLY,
  },
});

Member.hasMany(Dues);
Dues.belongsTo(Member);

const syncAndSeed = async () => {
  await db.sync({ force: true });
  const jennifer = await Member.create({
    lastName: "Woodbury",
    firstName: "Jennifer",
    contactNum: "111-111-1111",
    email: "jwoodbury@aol.com",
    address: "111 East 20th Street",
    city: "Brooklyn",
    state: "NY",
    zip: 11216,
    joinDate: "2000-01-01",
  });
  const keisha = await Member.create({
    lastName: "Cole",
    firstName: "Keisha",
    contactNum: "111-111-1111",
    email: "kcole@msn.com",
    address: "222 East 8th Street",
    city: "Brooklyn",
    state: "NY",
    zip: 11216,
    joinDate: "2000-02-01",
  });
  const tenisha = await Member.create({
    lastName: "Almon",
    firstName: "Tenisha",
    contactNum: "111-111-1111",
    email: "talmon@gmail.com",
    address: "333 East 30th Street",
    city: "Brooklyn",
    state: "NY",
    zip: 11216,
    joinDate: "2020-01-01",
  });
  const gretchen = await Member.create({
    lastName: "Jefferson",
    firstName: "Gretchen",
    contactNum: "111-111-1111",
    email: "gjefferson@yahoo.com",
    address: "444 East 9th Street",
    city: "Brooklyn",
    state: "NY",
    zip: 11216,
    joinDate: "1983-05-01",
  });
  const doreen = await Member.create({
    lastName: "Figueroa",
    firstName: "Doreen",
    contactNum: "555-555-5555",
    email: "dfigueroa@gmail.com",
    address: "555 East 50th Street",
    city: "Brooklyn",
    state: "NY",
    zip: 11216,
    joinDate: "2022-02-01",
  });
  await Dues.create({
    paymentFor: "Annual",
    paymentAmount: 2350,
    paymentDate: "2022-03-01",
    memberId: jennifer.id,
  });
  await Dues.create({
    paymentFor: "Monthly",
    paymentAmount: 250,
    paymentDate: "2022-02-01",
    memberId: jennifer.id,
  });
  await Dues.create({
    paymentFor: "Annual",
    paymentAmount: 1350,
    paymentDate: "2022-01-15",
    memberId: gretchen.id,
  });
  await Dues.create({
    paymentFor: "Monthly",
    paymentAmount: 350,
    paymentDate: "2022-03-01",
    memberId: tenisha.id,
  });
  await Dues.create({
    paymentFor: "Annual",
    paymentAmount: 350,
    paymentDate: "2022-02-28",
    memberId: keisha.id,
  });
  await Dues.create({
    paymentFor: "Annual",
    paymentAmount: 1550,
    paymentDate: "2022-03-05",
    memberId: doreen.id,
  });
  await Dues.create({
    paymentFor: "Monthly",
    paymentAmount: 350,
    paymentDate: "2022-03-05",
    memberId: gretchen.id,
  });
  await Dues.create({
    paymentFor: "Event",
    paymentAmount: 350,
    paymentDate: "2022-03-01",
    memberId: doreen.id,
  });
};

module.exports = { db, Member, Dues, syncAndSeed };
