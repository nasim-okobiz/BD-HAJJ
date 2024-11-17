const { NotFoundError } = require("../../utils/errors.js");
const BaseService = require("../base/base.service.js");
const noticeRepository = require("./notice.repository.js");

class NoticeService extends BaseService {
  #repository;

  constructor(repository, serviceName) {
    super(repository, serviceName);
    this.#repository = repository;

  }
//
  async createNotice(payload, session) {
    const {  notice } = payload;
    if ( !notice) throw new Error("Please provide notice");
    const noticeData = await this.#repository.createNotice(payload, session);
    return noticeData;
  }
  async getNotice() {
    return await this.#repository.findAll();
  }
  async updateNotice(id, payload) {
    const {  notice } = payload;
    if (!notice) throw new Error("Please provide notice");
    const noticeData = await this.#repository.updateNotice(id, payload);
    if (!noticeData) throw new NotFoundError("Notice data not found");
    return noticeData;

  }
  async deleteNotice(id) {
    const deletedNotice = await this.#repository.deleteById(id);
    if (!deletedNotice) throw new NotFoundError("Notice not found");
    return deletedNotice;
  }

}

module.exports = new NoticeService(noticeRepository, "notice");
