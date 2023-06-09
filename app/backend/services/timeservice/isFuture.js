export default (_, dclass, factory) => {
    const makeNow = thisDay => (thisDay.$u ? factory.utc() : factory())

    dclass.prototype.isFuture = function () {
        return this.isAfter(makeNow(this))
    }
};