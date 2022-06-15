export default function (el = {}) {
  return {
    percent: {
      online: el.online_fee_percent,
      cash: el.cash_fee_percent
    },
    minimal: el.minimal_fee
  }
}
