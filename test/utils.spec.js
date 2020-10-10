import chai from 'chai'

import { formatDate } from '../src/utils'

describe('Utils', () => {

  it('should format the date into [HH:MM]', () => {
    chai.assert.match(formatDate(new Date()), /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/, 'date is formatted to [HH:MM].');
  });

});
