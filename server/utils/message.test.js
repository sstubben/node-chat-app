var {generateMessage, generateLocationMessage} = require('./message')

describe("generateMessage", () => {
  it("should generate correct mesage object", () => {
    var from = 'Admin'
    var text = 'This is a test'
    var message = generateMessage(from,text)
    expect(message).toMatchObject({
      from,
      text
    })
    expect(typeof message.createdAt).toBe('number');
  });
});

describe("generateLocationMessage", () => {
  it("should generate correct location object", () => {
    var from = 'Admin'
    var latitude = 12.12
    var longitude = 0.1
    var message = generateLocationMessage(from,latitude,longitude)
    expect(message).toMatchObject({
      from,
      url: `https://www.google.com/maps/?q=${latitude},${longitude}`
    })
    expect(typeof message.createdAt).toBe('number');
  })
})
