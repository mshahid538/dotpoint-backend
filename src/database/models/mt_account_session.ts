import mongoose from 'mongoose';

const mtAccountSessionSchema: any = new mongoose.Schema({
    startDate: { type: String, default: null },
    endDate: { type: String, default: null },
    accountId: { type: String, default: null },
    platform: { type: String, default: null },
    broker: { type: String, default: null },
    currency: { type: String, default: null },
    server: { type: String, default: null },
    balance: { type: Number, default: 0 },
    openingBalance: { type: Number, default: 0 },
    closingBalance: { type: Number, default: 0 },
    equity: { type: Number, default: 0 },
    margin: { type: Number, default: 0 },
    freeMargin: { type: Number, default: 0 },
    leverage: { type: Number, default: 0 },
    name: { type: String, default: null },
    login: { type: Number, default: 0 },
    noOfTrades: { type: Number, default: 0 },
    noOfLots: { type: Number, default: 0 },
    result: { type: Number, default: 0 },
    credit: { type: Number, default: 0 },
    tradeAllowed: { type: Boolean, default: true },
    investorMode: { type: Boolean, default: true },
    marginMode: { type: String, default: null },
    type: { type: String, default: null },
    isActive: { type: Boolean, default: true },
    isBlock: { type: Boolean, default: false },
    workspaceId: { type: String, default: null },
    createdBy: { type: mongoose.Schema.Types.ObjectId, default: null, ref: "user" },
    challengeUserId: { type: mongoose.Schema.Types.ObjectId, default: null, ref: "challenge_user" },
}, { timestamps: true })

export const mtAccountSessionModel = mongoose.model<any>('mt_account_session', mtAccountSessionSchema);