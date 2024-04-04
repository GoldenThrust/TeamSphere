import { spy } from 'sinon';
import { expect } from 'chai';
import { describe, it } from 'node:test';
import mongoDB from '../../src/config/db';


describe("DB Connection", ()=> {
    it("DB Connection", async () => {
        const mongo = spy(mongoDB);
        expect(await mongo.connected).to.be(true)
    });
})

