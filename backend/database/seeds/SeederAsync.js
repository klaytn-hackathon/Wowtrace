const AgriTechSeederAsync = require("./AgriTechSeederAsync")

class SeederAsync {
  async run () {
    const start = new AgriTechSeederAsync()
    await start.seedings()
  }
}

module.exports = SeederAsync