import { processWelcome } from '../src/processor';
describe('welcome processor',()=>{it('returns a delivery result',async()=>expect(await processWelcome({customerId:'c-1',email:'ada@example.com'})).toEqual({customerId:'c-1',delivered:true})); it('rejects malformed addresses',async()=>expect(processWelcome({customerId:'c-1',email:'invalid'})).rejects.toThrow('Invalid welcome email'));});
