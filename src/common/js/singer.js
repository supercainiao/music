export default class Singer {
    constructor(option) {
        this.id = option.id;
        this.name = option.name
        this.avatar = `https://y.gtimg.cn/music/photo_new/T001R300x300M000${option.id}.jpg?max_age=2592000`
    }
}