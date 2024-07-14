export class DbQueries{
    static selectProductQtyWithSku(sku: string){
        return `select qty from product_inventory as pi, product as p where pi.product_inventory_product_id  = p.product_id and p.sku = ${sku}`;
    }

    static deleteAllCoupons(){
        return `delete from coupon`;
    }

    static insertCoupon(couponCode: string, description: string, discountAmount: number, discountType: number){
        return `insert into coupon (coupon, description, discount_amount, discount_type, condition, user_condition) values ('${couponCode}', '${description}', ${discountAmount}, '${discountType}', '{"order_qty": "", "order_total": ""}', '{"emails": "", "groups": [""], "purchased": ""}')`
    }
}