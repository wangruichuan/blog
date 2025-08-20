var Product = (function () {
    function Product(name, unitPrice, number) {
        /**
         * getPrototypeOf : 用于获取指定对象的原型（即其 [[Prototype]]内部属性）
         * const obj = {};
         * const prototype = Object.getPrototypeOf(obj);
         * console.log(prototype === Object.prototype); // true
         */
        if (Object.getPrototypeOf(this) !== Product.prototype) {
            throw new Error("Cannot construct Product instances directly");
        }
        this.name = name;
        this.unitPrice = unitPrice;
        this.number = number;

        Object.defineProperty(this, "totalPrice", {
            get() {
                return this.unitPrice * this.number;
            },
            enumerable: false
        });
        Product.count++
    }
    Product.count = 0
    Product.prototype.increase = function () {
        this.number++;
    }
    Object.defineProperty(Product.prototype, "totalPrice", {
        get() {
            return this.unitPrice * this.number;
        },
        enumerable: false
    });
    Object.defineProperty(Product.prototype, "increase", {

        enumerable: false,
        value: function () {
            if (Object.getPrototypeOf(this) === Product.increase.prototype) {
                throw new TypeError("it is not a constructor")
            }
            this.number++;
        }
    });

    return Product;
})

new Product("Bread", 1.5, 5)

