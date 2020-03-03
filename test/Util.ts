import ava from 'ava';
import { Snowflake } from '../dist';

ava('new Snowflake()', (test): void => {
	test.plan(8);

	const testID = '167383252271628289';
	const snow = new Snowflake(testID);

	test.is(snow.id, BigInt(testID)); // eslint-disable-line no-undef
	test.is(snow.timestamp, 1459977677172);
	test.is(snow.workerID, 0);
	test.is(snow.processID, 0);
	test.is(snow.increment, 1);
	test.is(snow.binary, '0000001001010010101010100010111001011101000000000000000000000001');
	test.deepEqual(snow.date, new Date(1459977677172));
	test.is(snow.toString(), testID);
});

ava('Snowflake.generate(number)', (test): void => {
	test.plan(8);

	const testID = '167383252271763456';
	const testTimestamp = 1459977677172;
	const snow = Snowflake.generate(testTimestamp);

	test.is(snow.id, BigInt(testID)); // eslint-disable-line no-undef
	test.is(snow.timestamp, testTimestamp);
	test.is(snow.workerID, 1);
	test.is(snow.processID, 1);
	test.is(snow.increment, 0);
	test.is(snow.binary, '0000001001010010101010100010111001011101000000100001000000000000');
	test.deepEqual(snow.date, new Date(testTimestamp));
	test.is(snow.toString(), testID);
});

ava('Snowflake.generate(Date)', (test): void => {
	test.plan(8);

	const testID = '167383252271763457';
	const testDate = new Date(1459977677172);
	const snow = Snowflake.generate(testDate);

	test.is(snow.id, BigInt(testID)); // eslint-disable-line no-undef
	test.is(snow.timestamp, testDate.valueOf());
	test.is(snow.workerID, 1);
	test.is(snow.processID, 1);
	test.is(snow.increment, 1);
	test.is(snow.binary, '0000001001010010101010100010111001011101000000100001000000000001');
	test.deepEqual(snow.date, testDate);
	test.is(snow.toString(), testID);
});

ava('Snowflake.generate(now)', (test): void => {
	test.plan(2);

	const testTimestamp = Date.now();
	const snow = Snowflake.generate();

	test.is(snow.timestamp, testTimestamp);
	test.deepEqual(snow.date, new Date(testTimestamp));
});

ava('Snowflake.generate(NaN)', (test): void => {
	// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
	// @ts-ignore
	test.throws(() => Snowflake.generate('foo'), { instanceOf: TypeError });
});

ava('Snowflake.generate(invalid)', (test): void => {
	// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
	// @ts-ignore
	test.throws(() => Snowflake.generate(true), { instanceOf: TypeError });
});
