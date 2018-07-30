var {generateMessage} = require('./message')

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
