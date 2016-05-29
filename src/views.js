export default class {
  constructor(views) {
    this.now = null
    this.vdata = {}
    this.views = {}
    views.forEach((view, i) => {
      this.compile(view).then(() => {
        if (i == 0) {
          this.load(view)
        }
      })
    });
  }
  compile(name) {
    return new Promise((resolve, reject) => {
      $.get('templates/'+name+'.html', (file) => {
        this.views[name] = Handlebars.compile(file)(this.vdata[name])
        resolve(this.views[name])
      })
    })
  }
  get(viewId) {
    return this.vdata[viewId]
  }
  edit(viewId, data) {
    this.vdata[viewId] = data;
    this.compile(viewId).then((value) => {
      if (viewId == this.now) {
        this.reload()
      }
    })
  }
  load(viewId, callback) {
    $('.page-content').html(this.views[viewId])
    $('[class*=mdl]').each((index, item) => {
      componentHandler.upgradeElement(item)
    })
    this.now = viewId
    if (callback) {
      callback()
    }
  }
  reload() {
    this.load(this.now);
  }
}
