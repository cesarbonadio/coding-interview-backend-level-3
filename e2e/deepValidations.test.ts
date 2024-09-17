import { initializeServer } from '../src/server'
import { Server } from '@hapi/hapi'

describe('Deep validation tests', () => {
    let server: Server

    beforeEach(async () => {
        server = await initializeServer()
    })

    describe("More Validations", () => {
        it("should not allow for another type for price rather than number", async () => {
            const invalidPayloads = [
                { // string of digits
                    name: 'Item 5',
                    price: '1'
                },
                { // array
                    name: 'Item 5',
                    price: []
                },
                { // object
                    name: 'Item 5',
                    price: {}
                },
                { // alphabetic string
                    name: 'Item 5',
                    price: "price"
                },
                { // boolean
                    name: 'Item 5',
                    price: true
                },
                { // undefined
                    name: 'Item 5',
                    price: null
                }
            ]

            invalidPayloads.forEach(async payload => {
                let response = await server.inject({
                    method: 'POST',
                    url: '/items',
                    payload
                })
                expect(response.statusCode).toBe(400)
                expect(response.result).toEqual({
                    errors: [
                        {
                            field: 'price',
                            message: 'Field "price" must be a number'
                        }
                    ]
                })
            })
        })
        it("should not allow not specified fields. In other words, nothing else than price and name", async () => {
            const invalidPayload = {
                price: 10,
                name: "item 3",
                anotherField: "validateme"
            }
            let response = await server.inject({
                method: 'POST',
                url: '/items',
                payload: invalidPayload
            })
            expect(response.statusCode).toBe(400)
            expect(response.result).toEqual({
                errors: [
                    {
                        field: 'anotherField',
                        message: 'Field "anotherField" is not allowed'
                    }
                ]
            })
        })
        it("should validate the presence of name field", async () => {
            const response = await server.inject({
                method: 'POST',
                url: '/items',
                payload: {
                    price: 10
                }
            })

            expect(response.statusCode).toBe(400)
            expect(response.result).toEqual({
                errors: [
                    {
                        field: 'name',
                        message: 'Field "name" is required'
                    }
                ]
            })
        })

        it("should not allow name being more than 30 characters long", async () => {
            const response = await server.inject({
                method: 'POST',
                url: '/items',
                payload: {
                    name: "supercalifragilisticexpialidocious",
                    price: 10
                }
            })

            expect(response.statusCode).toBe(400)
            expect(response.result).toEqual({
                errors: [
                    {
                        field: 'name',
                        message: 'Field "name" length must be less than or equal to 30 characters long'
                    }
                ]
            })
        })

        it("should not allow name being less than 3 characters long", async () => {
            const response = await server.inject({
                method: 'POST',
                url: '/items',
                payload: {
                    name: "je",
                    price: 10
                }
            })

            expect(response.statusCode).toBe(400)
            expect(response.result).toEqual({
                errors: [
                    {
                        field: 'name',
                        message: 'Field "name" length must be at least 3 characters long'
                    }
                ]
            })
        })

        it("should not allow another type in the payload than object", async () => {
            const response = await server.inject({
                method: 'POST',
                url: '/items',
                payload: []
            })

            expect(response.statusCode).toBe(400)
            expect(response.result).toEqual({
                errors: [
                    {
                        message: 'Field "value" must be of type object'
                    }
                ]
            })
        })
    })

    afterAll(() => {
        return server.stop()
    })
})