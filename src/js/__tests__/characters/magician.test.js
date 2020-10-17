import Magician from '../../characters/magician';

test.each([
  [1],
  [true],
  [null],
  [undefined],
  [[]],
  [{}],
  ['a'],
  ['a '],
  [' a  a'],
  ['aaaa '],
  ['aaaaaaaaaaa'],
])('%p', (name) => {
  expect(() => {
    // eslint-disable-next-line no-new
    new Magician(name);
  }).toThrow();
});

test.each([
  ['Alex', -40],
  ['Alex', '40'],
  ['Alex', NaN],
  ['Alex', true],
  ['Alex', null],
  ['Alex', undefined],
])('%p %p', (name, points) => {
  const result = new Magician(name);
  expect(() => {
    result.damage(points);
  }).toThrow();
});

test.each([
  ['Alex', 0, {
    attack: 10,
    defence: 40,
    health: 100,
    level: 1,
    name: 'Alex',
    type: 'magician',
  }],
  ['Semen', 50, {
    attack: 10,
    defence: 40,
    health: 70,
    level: 1,
    name: 'Semen',
    type: 'magician',
  }],
  ['noob', 500, {
    attack: 10,
    defence: 40,
    health: -200,
    level: 1,
    name: 'noob',
    type: 'magician',
  }],
])('%p %p', (name, points, expected) => {
  const result = new Magician(name);
  result.damage(points);
  expect(result).toEqual(expected);
});

test('урон по персонажу с отрицательным количеством здоровья', () => {
  const result = new Magician('Alex');
  result.damage(500);
  result.damage(500);
  expect(result.health).toBe(-200);
});

test.each([
  ['Alex', -40],
  ['Alex', 0],
])('%p %p', (name, health) => {
  const result = new Magician(name);
  result.health = health;
  expect(() => {
    result.levelUp();
  }).toThrow();
});

test.each([
  ['Alex', 1, {
    attack: 12,
    defence: 48,
    health: 100,
    level: 2,
    name: 'Alex',
    type: 'magician',
  }],
  ['Semen', 3, {
    attack: 17,
    defence: 70,
    health: 100,
    level: 4,
    name: 'Semen',
    type: 'magician',
  }],
  ['noob', 5, {
    attack: 24,
    defence: 101,
    health: 100,
    level: 6,
    name: 'noob',
    type: 'magician',
  }],
])('%p %p', (name, cnt, expected) => {
  const result = new Magician(name);
  for (let i = 0; i < cnt; i += 1) {
    result.levelUp();
  }
  expect(result).toEqual(expected);
});

// прибавление здоровья после получения урона
test('урон по персонажу Magician 6 уровня', () => {
  const result = new Magician('Alex');
  for (let i = 0; i < 5; i += 1) {
    result.levelUp();
  }
  result.damage(5000);
  expect(Math.round(result.health)).toBe(150);
});
