odoo.define('pos_product_offers.PosOfferButton', function(require) {
'use strict';

    const PosComponent = require('point_of_sale.PosComponent');
    const ProductScreen = require('point_of_sale.ProductScreen');
    const { useListener } = require('web.custom_hooks');
    const Registries = require('point_of_sale.Registries');

    class PosOfferButton extends PosComponent {
        constructor() {
            super(...arguments);
            useListener('click', this.onClick);
        }
        is_available() {
            const order = this.env.pos.get_order();
            return order ? order.get_available_offers().length > 0 : false;
        }
        async onClick() {
            let order = this.env.pos.get_order();
            let client = this.env.pos.get('client') || this.env.pos.get_client();
            

            var offers = order.get_available_offers();
            
            const offersList = offers.map(offer => ({
                id: offer.id,
                label: offer.name,
                item: offer,
            }));

            const { confirmed, payload: selectedOffer } = await this.showPopup('SelectionPopup',
                {
                    title: this.env._t('Please select an Offer'),
                    list: offersList,
                }
            );

            if(confirmed)
                order.apply_offer(selectedOffer);
            
            
            return;
        }
    }
    PosOfferButton.template = 'PosOfferButton';

    ProductScreen.addControlButton({
        component: PosOfferButton,
        condition: function() {
            return true;
        },
    });

    Registries.Component.add(PosOfferButton);

    return PosOfferButton;
});
