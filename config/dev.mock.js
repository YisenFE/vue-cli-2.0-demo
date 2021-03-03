/**
 * @file 请求本地中间件
 * @author shiyisen
 * @time 19/01/03
 */
module.exports = function (req, res, next) {
  let path = req.path
  if (req.headers.isajax === 'true') {
    console.log(`request: ${path} mock to ../mock${path}.js`)
    path = '../mock' + path
    res.writeHead(200, {'Content-Type': 'text/html;charset:UTF-8'})
    res.end(JSON.stringify(require(path)(req.body && req.body.params)))
    delete require.cache[require.resolve(path)]
    return true
  }
  return next()
}