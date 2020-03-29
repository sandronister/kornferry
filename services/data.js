const moment = require('moment')

function data(app) {
  this._app = app
}

data.prototype.formatOneDay = function(obj) {
  if (obj.dtini) {
    obj.dtini = moment(obj.dtini).format('Y-MM-DD HH:mm:ss')
    obj.dtend = moment(obj.dtend).format('Y-MM-DD 23:59:59')
  }

  if (!obj.dtini) {
    obj.dtini = moment()
      .subtract(1, 'days')
      .format('Y-MM-DD 00:00:00')
    obj.dtend = moment().format('Y-MM-DD 23:59:59')
  }

  this.setDiffHours(obj)
}

data.prototype.formatHoursDefined = function(obj, time) {
  if (!obj.dtini) {
    obj.dtini = moment().format('Y-MM-DD HH:mm')
    obj.dtend = moment()
      .add(time, 'hours')
      .format('Y-MM-DD HH:mm:ss')
    return
  }

  obj.dtini = moment(obj.dtini).format('Y-MM-DD HH:mm:ss')
  obj.dtend = moment(obj.dtend).format('Y-MM-DD HH:mm:ss')
}

data.prototype.getNow = function() {
  return moment().format('Y-MM-DD HH:mm:ss')
}

data.prototype.geToday = function() {
  return moment().format('Y-MM-DD')
}

data.prototype.getAddHours = function(time) {
  return moment()
    .add(time, 'hours')
    .format('Y-MM-DD HH:mm:ss')
}

data.prototype.formatToday = function(obj) {
  if (!obj.data) {
    obj.data = moment().format('Y-MM-DD')
  }
}

data.prototype.setDiffHours = function(obj) {
  const date1 = new Date(obj.dtini)
  const date2 = new Date(obj.dtend)
  const timeDiff = Math.abs(date2.getTime() - date1.getTime())

  obj.diffHours = Math.ceil(timeDiff / (1000 * 3600))
}

data.prototype.getDiffMinutes = function(dtini, dtend) {
  const date1 = new Date(dtini)
  const date2 = new Date(dtend)
  const timeDiff = Math.abs(date2.getTime() - date1.getTime())
  return timeDiff / (1000 * 3600)
}

data.prototype.getPeriod = function(device) {
  const initialDate = moment().format('Y-MM-' + device.data_corte)
  const now = moment().format('Y-MM-DD')

  let result = {
    dtini: initialDate,
    dtend: moment(initialDate)
      .add('1', 'month')
      .format('Y-MM-DD')
  }

  if (moment(initialDate).isAfter(now)) {
    result = {
      dtini: moment(initialDate)
        .subtract('1', 'month')
        .format('Y-MM-DD'),
      dtend: initialDate
    }
  }

  this.setDiffHours(result)

  return result
}

data.prototype.isMajor = function(dt1, dt2) {
  const initD = moment(dt1)
  const finalD = moment(dt2)

  return initD.isAfter(finalD)
}

module.exports = function() {
  return data
}
