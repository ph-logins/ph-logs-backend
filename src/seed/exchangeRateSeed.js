// const mongoose = require("mongoose");
// require("dotenv").config();

// const ExchangeRate = require("../models/ExchangeRate");

// const exchangeRate = {
//     baseCurrency: "USD",
//     targetCurrency: "NGN",
//     rate: 1500,
//     provider: "SYSTEM",
//     enabled: true,
// };

// const seedExchangeRate = async () => {
//     try {
//         if (mongoose.connection.readyState === 0) {
//             await mongoose.connect(process.env.MONGODB_URI);
//         }

//         console.log("🔥 Checking Exchange Rates...");

//         await ExchangeRate.findOneAndUpdate(
//             {
//                 baseCurrency: exchangeRate.baseCurrency,
//                 targetCurrency: exchangeRate.targetCurrency,
//             },
//             exchangeRate,
//             {
//                 new: true,
//                 upsert: true,
//             }
//         );

//         // Remove any accidental duplicates
//         const duplicates = await ExchangeRate.find({
//             baseCurrency: exchangeRate.baseCurrency,
//             targetCurrency: exchangeRate.targetCurrency,
//         }).sort({ createdAt: -1 });

//         if (duplicates.length > 1) {
//             const idsToDelete = duplicates.slice(1).map(doc => doc._id);

//             await ExchangeRate.deleteMany({
//                 _id: { $in: idsToDelete },
//             });

//             console.log(
//                 `🧹 Removed ${idsToDelete.length} duplicate exchange rate(s)`
//             );
//         }

//         console.log("✅ Exchange rate is set to 1500");

//     } catch (err) {
//         console.error(
//             "❌ Exchange Rate Seed Error:",
//             err.message
//         );
//     }
// };

// module.exports = seedExchangeRate;


const mongoose = require("mongoose");
require("dotenv").config();

const ExchangeRate = require("../models/ExchangeRate");

const exchangeRate = {
    fromCurrency: "USD",
    toCurrency: "NGN",
    rate: 1500,
    enabled: true,
};

const seedExchangeRate = async () => {
    try {
        if (mongoose.connection.readyState === 0) {
            await mongoose.connect(process.env.MONGODB_URI);
        }

        console.log("🔥 Checking Exchange Rates...");

        await ExchangeRate.findOneAndUpdate(
            {
                fromCurrency: exchangeRate.fromCurrency,
                toCurrency: exchangeRate.toCurrency,
            },
            {
                $set: {
                    rate: exchangeRate.rate,
                    enabled: exchangeRate.enabled,
                },
                $setOnInsert: {
                    fromCurrency: exchangeRate.fromCurrency,
                    toCurrency: exchangeRate.toCurrency,
                },
            },
            {
                new: true,
                upsert: true,
                runValidators: true,
                setDefaultsOnInsert: true,
            }
        );

        console.log("✅ Exchange rate is set to 1500");

    } catch (err) {
        console.error(
            "❌ Exchange Rate Seed Error:",
            err.message
        );
    }
};

module.exports = seedExchangeRate;
