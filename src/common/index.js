const { accessoriesBlock, promoCardsBlock, needGuidanceBlock, inviteCardsBlock, mobileRechargeModal, fiberRechargeModal, fiberPaybillModal, mobilePaybillModal } = require("../blocks")

const commonBlocks = {
  "accessoriesBlock": {
    ...accessoriesBlock,
    "key": 'accessories',
    "name": "Accessories"    
  },
  "promoCardsBlock": {
    ...promoCardsBlock,
    "key": 'promocards',
    "name": "Promocards"
  },
  "needGuidanceBlock": {
    ...needGuidanceBlock,
    "key": 'needGuidance',
    "name": "NeedGuidance"
  },
  "inviteCardsBlock": {
    ...inviteCardsBlock,
    "key": 'inviteCard',
    "name": "InviteCard"
  },
  "mobileRechargeModal": {
    ...mobileRechargeModal,
    "key": 'mobile-recharge-modal',
    "name": "MobileRechargeModal"
  },
  "mobileRechargeModal": {
    ...mobileRechargeModal,
    "key": 'mobile-recharge-modal',
    "name": "MobileRechargeModal"
  },
  "fiberRechargeModal": {
    ...fiberRechargeModal,
    "key": 'fiber-recharge-modal',
    "name": "FiberRechargeModal"
  },
  "fiberPaybillModal": {
    ...fiberPaybillModal,
    "key": 'fiber-paybill-modal',
    "name": "FiberPayBillModal"
  },
  "mobilePaybillModal": {
    ...mobilePaybillModal,
    "key": 'mobile-paybill-modal',
    "name": "MobilePayBillModal"
  }
}

module.exports = {
  commonBlocks
}