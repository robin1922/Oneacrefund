# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

{
    'name': 'POS Product Offers',
    'version': '13.0.1.4',
    "author": "Robin Joseph",
    'website': 'www.odoo.com',
    'license': 'OPL-1',
    'category':  'Account',
    'summary': 'POS Product Offers',
    'description':
        """POS Product Offers
        """,
    'depends': ['point_of_sale'],
    'data': [
        'security/ir.model.access.csv',
        'views/product_offer_view.xml',
    ],
    
    'assets': {
        'point_of_sale.assets': [
            'pos_product_offers/static/src/css/pos.css',
            'pos_product_offers/static/src/js/models.js',
            'pos_product_offers/static/src/js/Offer.js',
            'pos_product_offers/static/src/js/PosOfferButton.js',
        ],
        'web.assets_qweb': [
            'pos_product_offers/static/src/xml/**/*',
        ],
    },
    
    'installable': True,
    'auto_install': False,
}
