const {Users} = require('./users')

describe('Users', () => {

    beforeEach(() => {
        users = new Users()
        users.users = [{
            id: '1',
            name: 'Mike',
            room: 'Node Course'
        },
        {
            id: '2',
            name: 'John',
            room: 'React Course'
        }, 
        {
            id: '3',
            name: 'Donna',
            room: 'Node Course'
        }]
    })

    it('should add new User', () => {
        var users = new Users()
        var user = {
            id: '11',
            name: 'John',
            room: 'Chat room'
        }
        users.addUser(user.id,user.name,user.room)
        expect(users.users).toEqual([user])
    })

    it('should remove a user', () => {
        var removedUser = users.removeUser(users.users[0].id)      
        expect(removedUser.name).toEqual('Mike')
        expect(users.users.length).toEqual(2)
    })

    it('should not remove user', () => {
        var wrongUser = users.removeUser(users.users.length+1)
        expect(wrongUser).toBeUndefined()
        expect(users.users.length).toEqual(3)
    });

    it('should get user by id', () => {
        var user = users.getUser(users.users[1].id)
        expect(user.name).toEqual('John')
    });

    it('should not get a user', () => {
        var wrongUser = users.getUser(users.users.length+1)
        expect(wrongUser).toBeUndefined()
    });

    it('should return names for node course', () => {
        var userList = users.getUserList('Node Course')
        expect(userList).toEqual(['Mike','Donna'])
    })

    it('should return names for react course', () => {
        var userList = users.getUserList('React Course')
        expect(userList).toEqual(['John'])
    })
})