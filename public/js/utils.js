/**
 * This is the JavaScript file that we wrote for you to handle
 * certain features without having you worry too much about the
 * underlying tasks
 *
 * You do not need to change or remove this file. You are also
 * not required to use these functions.
 *
 * AUTHOR: @itsmingjie
 */

class Utils {
  /** calling `saveObject(key, object)` will save the referenced
   * object to the browser's LocalStorage under key. */
  static saveObject = (key, object) => {
    if (this._isEmpty(key)) {
      throw new Error("Key cannot be empty.");
    } else if (this._isFunction(object)) {
      throw new Error("Cannot save functions");
    } else if (object instanceof Node) {
      throw new Error("Cannot save DOM elements");
    }

    let serialized = JSON.stringify(object);
    localStorage.setItem(key, serialized);
  };

  /** calling `readObject(key)` will return the object stored in the 
   *  browser's LocalStorage under key. If the object does not 
   *  exist, null will be returned. */
  static readObject = (key) => {
    console.log(key);

    if (this._isEmpty(key)) {
      throw new Error("Key cannot be empty.");
    }

    let serialized = localStorage.getItem(key);
    return JSON.parse(serialized);
  };

  /** calling `removeObject(key)` will remove the object stored in the 
   *  browser's LocalStorage under key, and will return the object removed. 
   *  If the object does not exist, null will be returned. */
  static removeObject = (key) => {
    object = this.readObject(key);

    if (object != null) {
      localStorage.removeItem(key);
    }

    return object;
  };

  static _isEmpty = (string) => {
    return !string || 0 === string.length;
  };

  static _isFunction = (o) => {
    return o && {}.toString.call(o) === "[object Function]";
  };
}

/** Unit tests to test Utils functionalities */
class UtilsTester {
  static run = () => {
    this.primitiveSanityTest();
    this.objectSanityTest();
  };

  static primitiveSanityTest = () => {
    let x = 10;
    let y = "Hello World";
    let z = false;

    Utils.saveObject("x", x);
    Utils.saveObject("y", y);
    Utils.saveObject("z", z);

    console.assert(Utils.readObject("x") === x, "value of x is incorrect");
    console.assert(Utils.readObject("y") === y, "value of y is incorrect");
    console.assert(Utils.readObject("z") === z, "value of z is incorrect");
  };

  static objectSanityTest = () => {
    let car = { type: "Fiat", model: "500", color: "white" };
    Utils.saveObject("car", car);

    console.assert(
      this._objEq(Utils.readObject("car"), car),
      "value of car is incorrect"
    );
  };

  /* from https://stackoverflow.com/a/6713782/11288183 */
  static _objEq = (x, y) => {
    if (x === y) return true;
    if (!(x instanceof Object) || !(y instanceof Object)) return false;
    if (x.constructor !== y.constructor) return false;
    for (var p in x) {
      if (!x.hasOwnProperty(p)) continue;
      if (!y.hasOwnProperty(p)) return false;
      if (x[p] === y[p]) continue;
      if (typeof x[p] !== "object") return false;
      if (!object_equals(x[p], y[p])) return false;
    }
    for (p in y) if (y.hasOwnProperty(p) && !x.hasOwnProperty(p)) return false;
    return true;
  };
}
