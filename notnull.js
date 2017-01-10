// @flow

export default function notnull<T>(thing: ?T): T {
  if (thing == null) throw new Error('unexpected null');
  return thing;
}
