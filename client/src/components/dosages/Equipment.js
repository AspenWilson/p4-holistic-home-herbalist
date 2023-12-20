import React from "react";
import { Card, Image, Grid } from 'semantic-ui-react'

function EquipmentTab () {
const equipment= [
    {   "equipment": "Coffee grinder",   "notes": "Coffee grinders are the home herbalist's best friend when it comes to powdering herbs. Buy them new or get them cheaply at thrift stores. They have to be babysat while you use them, and even then they don't last for a long time, but that's better than spending thousands of dollars on a commercial 1 herb grinder.",   "img_url": "https://cdn.shopify.com/s/files/1/1097/5586/files/Coffee-Grinder-Guide-Hero.jpg?v=1688649858" },
    {   "equipment": "Dehydrator",   "notes": "Although not essential, a dehydrator is a useful tool for an herbalist. Dehydrators dry small batches of herbs quickly, and can be used to dehydrate herbal extracts to make tea concentrates and fluid extracts. ",   "img_url": "https://www.gopresto.com/i/1632340086236/n/uploads/06300_Product_Page_Main%5B2%5D.jpg" },
    {   "equipment": "Digital thermometer",   "notes": "A digital thermometer helps manage temperatures for oil extracts or when cooking off alcohol from glycerin extracts. If you have the budget, get an infrared thermometer; if not, a digital candy thermometer works well.",   "img_url": "https://www.seriouseats.com/thmb/MjF9JlGmRRrpb9YsAjIpwb8Gu3k=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/thermopop2handholdinginwater-d22e9aac24f04d89a2654140ffbd843c.jpg" },
    {   "equipment": "Funnels",   "notes": "Funnels in a variety of sizes are helpful in pouring liquid extracts and powders from container to container. Canning funnels are great, and you can check out your local automotive or kitchen supply store for a bigger variety of sizes.",   "img_url": "https://cdn11.bigcommerce.com/s-8466dwhhql/images/stencil/2048x2048/products/1358/1555/Stainless_Steel_funnel__19514.1591985920.jpg?c=1" },
    {   "equipment": "Herb press",   "notes": "An herb press isn't necessary for the beginning herbalist or home medicine maker, but if you make medicines long enough you'll tire of squeezing herbs by hand, which is time-consuming and inefficient, and leaves a lot of good medicine behind in the marc. A potato ricer is a nice starting herb press, and is much cheaper than most herb presses.",   "img_url": "https://i.ebayimg.com/images/g/RGUAAOSwbh5jGWUM/s-l400.jpg" },
        {   "equipment": "Jars",   "notes": "You will need jars-lots of them-if you get into medicine making. An assortment of mason jars is helpful: half pint, pint, and quart jars are all most home medicine makers need. If you're making medicine for an herbal practice, invest in half-gallon mason jars. One- gallon pickle jars work nicely for larger batches of tinctures. Gallon mason jars are no longer manufactured but can be found occasionally on eBay.",   "img_url": "https://saladinajar.com/wp-content/uploads/2019/08/5-Mason-jar-stars-1.jpg" },
        {   "equipment": "Measuring cups",   "notes": "Measuring cups are helpful when making weight-to-volume extracts. Graduated cylinders are great when you need precise measurements. ",   "img_url": "https://assets.wsimgs.com/wsimgs/rk/images/dp/wcm/202350/0017/all-clad-stainless-steel-measuring-cups-spoons-ultimate-se-o.jpg" },
        {   "equipment": "Mixing bowls",   "notes": "A dedicated set of stainless steel or glass bowls in a variety of sizes is essential. We prefer the stainless steel bowls with a pour spout, but even plastic bowls will work in a pinch.",   "img_url": "https://www.thespruceeats.com/thmb/qH39CqYWdmDz6ed8e2d-8aBvG_o=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Nordicware_MixingBowls_04-1063f468b2b544919298e4e6681694da.jpg" },
        {   "equipment": "Mortar and pestle",   "notes": "Although this seems like an antiquated tool, a mortar and pestle still comes in handy in medicine making. Most of the small marble sets are appropriate for displays and powdering small amounts of resins like myrrh. You can use larger sets to powder small batches of tea concentrates. (They are also good for powdering small amounts of whole spices for cooking.) If you have to powder roots and barks by hand, a tall cylindrical mortar and pestle is best.",   "img_url": "https://i.etsystatic.com/26470112/r/il/13f4bd/3420051645/il_570xN.3420051645_5luo.jpg" },
        {   "equipment": "Rubber spatulas",   "notes": "Rubber spatulas in an assortment of sizes will help get every last bit of medicine out of your jars.",   "img_url": "https://ae01.alicdn.com/kf/S4321d86a8c3a40df86b2aa55c376670dz/Food-Grade-Silicone-Spatulas-Kitchen-Utensils-for-Baking-Cooking-Heat-Resistant-Non-stick-Spatulas-Dishwasher-Safe.jpeg" },
        {   "equipment": "Scale",   "notes": "Buy a scale that measures in grams in addition to ounces and pounds. ",   "img_url": "https://www.thespruceeats.com/thmb/di7eZFa2ZFA0T9x1gQsh3Ko3F8Q=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Web_1500-20220207-kitchen-scales-vicky-wasik-group-spruce-eats-1-72de6c0208c6421288f7a61acb524eda.jpg" },
        {   "equipment": "Strainers and filters",   "notes": "Strainers and filters in a variety of sizes are essential to good medicine making. After an initial straining with a fine mesh strainer, pour the tincture through an unbleached paper coffee filter or two. Don't get cone filters with glued bottoms; the glue might be soluble in high-proof alcohol. You can also filter with paint strainer bags, available at most hardware stores, or with muslin tea bags. In either case, suspend the bag from the mouth of a jar. The lid band for the canning jar will fit snugly over the bags to hold them in place. Extra-fine gold mesh coffee filters are also nice, and can be reused much longer than cotton bag filters. Extracts made with cut and sifted herbs can be strained using several layers of unbleached, natural cheesecloth or organic cotton or flannel cloth. Don't use stainless or gold mesh filters to strain resinous herbs. ",   "img_url": "https://m.media-amazon.com/images/I/71Ku3fHtoCL._AC_SX425_.jpg" },
        {   "equipment": "Tincture Bottles",   "notes": "Best practice is to buy amber glass bottles. Most sets come with the droppers. These are a must have for any herbalist making their own tinctures. ",   "img_url": "https://stonylab.com/cdn/shop/files/4-Pack-60ml-Amber-Dropper-Bottle_-Glass-Dropper-with-Inner-Plug-and-Label-stonylab-22927333.jpg?v=1697280507" },
        {   "equipment": "Vitamix",   "notes": "A Vitamix with a dry blade is even better than a coffee grinder. The dry blade container makes quick work of all but the hardest roots. The old school Vitamix 3600 with the metal containers can grind hard roots, but can't powder as well as the models that support a dry blade container. In a pinch you can put your plant material and alcohol into a Vitamix, leave it running for an hour, and produce a passable tincture. (The constant agitation speeds up the maceration process, and the heat from the motor produces a hot ethanol extract.)",   "img_url": "https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/51llrMAMITL._AC_UF350,350_QL80_.jpg" }
       ]
    
       const EquipmentListings = () => {
        return equipment.map((item, index) => (
            <Card key={index} raised>
                <Card.Content>
                    <Grid>
                        <Grid.Column width={3}>
                            <Image src={item.img_url} size='small' centered/>
                        </Grid.Column>
                        <Grid.Column width={13}>
                            <Card.Header style={{color: 'black', fontSize:'16pt'}}>{item.equipment}</Card.Header> <br/>
                            <Card.Description style={{color: 'black', fontSize:'14pt'}}>{item.notes}</Card.Description>
                        </Grid.Column>
                    </Grid>
                </Card.Content>
            </Card>
        ))
       }
       return (
        <Card.Group itemsPerRow={1} >
            <EquipmentListings />
        </Card.Group>
       )
    }

export default EquipmentTab