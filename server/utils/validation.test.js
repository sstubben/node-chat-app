var {isRealString} = require('./validation')

describe("isRealString", () => {
    it("should reject non-string values", () => {
        var result = isRealString(1245)
        expect(result).toBeFalsy()
    })

    it('it should reject string only with only spaces', () => {
        var result = isRealString("   ")
        expect(result).toBeFalsy()
    })

    it('should allow strings with non-space characters', () => {
        var result = isRealString("  23 STRINGS Are great! ")
        expect(result).toBeTruthy()
    })
})
