# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

from odoo import api, fields, models, _

class PosProductOffer(models.Model):
    _name = "pos.product.offer"
    _description = "Pos Product Offer"
    
    
    name = fields.Char('Name')
    start_date = fields.Date(string='Start Date', default=fields.Date.today())
    end_date = fields.Date(string='End Date')
    offer_price = fields.Float('Offer Price')
    offer_product_ids = fields.Many2many('product.product', 'offer_pos_product_rel', 'offer_id', 'product_id', 'Products')
    

class PosOrderLine(models.Model):
    _inherit = "pos.order.line"
    
    offer_id = fields.Many2one('pos.product.offer', 'Product Offer')
    offer_str = fields.Char('Offer')
    