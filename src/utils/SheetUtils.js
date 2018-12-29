
const BASE_SHEET_URL = "https://spreadsheets.google.com/feeds/list/1ajKZbQWjKsu5eFAZ1vTRh-jamurXSub0z7NsX3ur4t8/",
    POST_SHEET_URL = "/public/values?alt=json";

const buildSheetUrl = function(sheetNo){
  return BASE_SHEET_URL + sheetNo + POST_SHEET_URL;
}

export default {
  buildSheetUrl,
  BASE_SHEET_URL,
  POST_SHEET_URL,
  CHARA_HEADERS_SHEET: 1,
  GENBU_SHEET: 2,
  BYAKKO_SHEET: 3,
  SUZAKU_SHEET: 4,
  SEIRYUU_SHEET: 5
}
