module.exports = function () {
  const { faker } = require("@faker-js/faker");
  var _ = require("lodash");
  return {
    products: _.times(85, function (n) {
      const dateRelease = faker.date.future();
      return {
        id: `000${n}`,
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        logo: faker.image.avatar(),
        date_release: dateRelease,
        date_revision: faker.date.future({ years: 1, refDate: dateRelease }),
      };
    }),
  };
};
