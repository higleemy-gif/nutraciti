# Requirements Document

## Introduction

Nutraciti International is a premium skincare brand selling to customers in India. This feature delivers the brand's e-commerce website: a Next.js 14 (App Router) storefront styled with Tailwind CSS, backed by Supabase for data and authentication, using Razorpay for online payments, and deployed on Vercel.

The storefront covers ten pages (Homepage, Product Listing, Product Detail, Login, Cart, Checkout, About Us, Track My Order, Wishlist, Admin Dashboard) and the features Indian shoppers expect: phone number OTP login with the +91 country code, Google login, Cash on Delivery, Razorpay UPI/Card/NetBanking payments, a pincode delivery checker, a "You saved ₹X" savings display, a GST breakdown, coupon codes, product reviews, a wishlist, and order tracking.

Assumptions made in this version (open for review):
- All prices are in Indian Rupees (INR) and include GST. The Storefront shows the GST included in each order but does not add GST on top of prices.
- Shipping is to Indian addresses only.
- Products, categories, coupons, and order fulfilment are managed through the in-site Admin_Dashboard. Serviceable_Pincode data and the assignment of the admin role to a customer profile are managed directly in Supabase.
- Returns and refunds are out of scope for this version. Refunds for cancelled Online Orders are handled outside the Storefront.
- Track My Order requires both the Order_Number and the Indian_Mobile_Number on the Order's delivery address, so that order details are not disclosed to someone who knows only the Order_Number.
- Only an Authenticated_Customer with an Order containing the Product whose fulfilment status is "Delivered" can review that Product.
- The Free_Shipping_Threshold and the COD_Limit are compared against amounts after the Coupon_Discount is subtracted.
- GST is calculated on product line totals after the Coupon_Discount is allocated across line items. GST on the Shipping_Fee and COD_Fee is not shown.
- Razorpay order creation times out after 10 seconds, and the Storefront waits up to 15 seconds for payment verification before showing a "payment is being confirmed" message.

## Glossary

- **Storefront**: The Next.js 14 web application that customers use to browse and buy Nutraciti products.
- **Customer**: Any person using the Storefront, signed in or not.
- **Authenticated_Customer**: A Customer with an active Supabase session.
- **Guest_Customer**: A Customer without an active Supabase session.
- **Auth_Service**: The Storefront component that handles sign-in, sign-out, and sessions through Supabase Auth.
- **Product_Catalog**: The Supabase-backed store of products, including name, slug, description, images, ingredients, usage instructions, Category, MRP, Selling_Price, GST_Rate, stock quantity, featured flag, date added, active status, and archived flag.
- **Category**: A named group of Products in the Product_Catalog, with a unique name and a unique slug. Each Product belongs to exactly one Category.
- **Archived_Product**: A Product that an Admin deleted while the Product appeared in at least one Order. An Archived_Product is inactive, is hidden from customer-facing pages and the Admin product list, and keeps its record so that Order history stays intact.
- **Product**: A single sellable item in the Product_Catalog.
- **MRP**: Maximum Retail Price of a Product in INR, as printed on the packaging.
- **Selling_Price**: The price in INR at which the Storefront sells a Product. The Selling_Price is less than or equal to the MRP.
- **Cart**: The set of Cart_Items a Customer intends to buy.
- **Cart_Item**: A pairing of one Product and a quantity inside the Cart.
- **Cart_Service**: The Storefront component that adds, updates, removes, persists, and merges Cart_Items.
- **Cart_Serializer**: The Cart_Service component that converts a Cart to and from its stored text representation.
- **Max_Item_Quantity**: The maximum quantity allowed for one Cart_Item, equal to the lesser of 10 and the Product's stock quantity.
- **Pincode**: A 6-digit Indian postal code whose first digit is between 1 and 9.
- **Serviceable_Pincode**: A Pincode listed in the Supabase pincode table, with an estimated delivery time in days and a COD availability flag.
- **Pincode_Checker**: The Storefront component that reports whether a Pincode is a Serviceable_Pincode.
- **Savings_Calculator**: The Storefront component that computes savings as the sum of (MRP − Selling_Price) × quantity across the relevant items.
- **Price_Formatter**: The Storefront component that formats INR amounts for display using the ₹ symbol and Indian digit grouping (for example, ₹1,23,456).
- **Subtotal**: The sum of Selling_Price × quantity across all Cart_Items.
- **Coupon**: An Admin-created discount code with a code text, a Coupon type of "percent" or "flat", a value, a minimum order value in INR, an expiry date, and an active flag. Coupon codes are compared case-insensitively.
- **Coupon_Service**: The Storefront component that validates Coupons and computes the Coupon_Discount.
- **Coupon_Discount**: The INR amount, in whole paise, subtracted from the Subtotal by an applied Coupon. The Coupon_Discount is zero when no Coupon is applied and never exceeds the Subtotal.
- **Discounted_Subtotal**: Subtotal − Coupon_Discount.
- **Shipping_Fee**: The delivery charge applied to an order. The Shipping_Fee is zero when the Discounted_Subtotal is at or above the Free_Shipping_Threshold.
- **Free_Shipping_Threshold**: A configured INR amount; when the Discounted_Subtotal is at or above this amount, the Shipping_Fee is zero.
- **COD_Fee**: A configured INR charge added to orders paid by Cash on Delivery.
- **COD_Limit**: A configured maximum Order_Total in INR, including the COD_Fee and after the Coupon_Discount, for which Cash on Delivery is offered.
- **Order_Total**: Subtotal − Coupon_Discount + Shipping_Fee + COD_Fee (COD_Fee applies only to COD orders).
- **GST_Rate**: The GST percentage included in a Product's prices, stored per Product as a whole number from 0 to 40, defaulting to 18.
- **GST_Calculator**: The Storefront component that computes the GST included in GST-inclusive amounts.
- **Line_Discount_Share**: The part of the Coupon_Discount allocated to one line item, as defined in Requirement 34.
- **GST_Amount**: The GST included in a line item, computed by the GST_Calculator as (line total − Line_Discount_Share) × GST_Rate ÷ (100 + GST_Rate), rounded to the nearest whole paise with halves rounded up. The GST_Amount of an Order or Cart is the sum of its line items' GST_Amounts.
- **Checkout_Service**: The Storefront component that collects the delivery address and payment method and creates orders.
- **Order**: A record in Supabase of a purchase, including line items (each with the Product identifier, Product name, quantity, MRP, Selling_Price, GST_Rate, Line_Discount_Share, and GST_Amount at the time of placement), address, amounts, applied Coupon code and Coupon_Discount, payment method, payment status, and Fulfilment_Status. The payment method is "Online" or "COD", and the payment status is "pending", "paid", or "failed".
- **Fulfilment_Status**: The delivery progress of an Order: one of "Placed", "Packed", "Shipped", "Delivered", or "Cancelled". An Order has no Fulfilment_Status until the Order is placed.
- **Placed_Order**: An Order that has a Fulfilment_Status. An Order becomes a Placed_Order when a COD Order is created, or when an Online Order's payment status becomes "paid"; at that moment the Fulfilment_Status is set to "Placed".
- **Order_Number**: A unique human-readable identifier assigned to each Placed_Order, consisting of 1 to 30 uppercase letters, digits, and hyphens.
- **Tracking_Number**: The courier's shipment identifier for a shipped Order, consisting of 4 to 40 letters, digits, and hyphens.
- **Courier_Name**: The name of the courier company carrying a shipped Order, 2 to 50 characters long.
- **Order_Tracker**: The Storefront component behind the Track My Order page that looks up a Placed_Order by Order_Number and Indian_Mobile_Number.
- **Admin**: An Authenticated_Customer whose customer profile has the role "admin". Every other Customer has the role "customer" or no profile.
- **Admin_Dashboard**: The set of Storefront pages under the /admin path, and the server endpoints they call, through which an Admin manages Products, Categories, Coupons, and Orders.
- **Review**: A Customer's rating of a Product, consisting of a star rating that is a whole number from 1 to 5 and review text, linked to one Authenticated_Customer and one Product.
- **Review_Service**: The Storefront component that accepts, stores, and displays Reviews.
- **Verified_Buyer**: An Authenticated_Customer who has at least one Order containing the Product with Fulfilment_Status "Delivered".
- **Wishlist**: The set of Products an Authenticated_Customer has saved for later, stored in Supabase linked to the Customer's account.
- **Wishlist_Service**: The Storefront component that adds Products to and removes Products from the Wishlist.
- **Payment_Gateway**: The Razorpay integration that processes UPI, Card, and NetBanking payments.
- **Payment_Verifier**: The server-side Storefront component that verifies Razorpay payment signatures and webhook events.
- **COD**: Cash on Delivery, a payment method where the Customer pays in cash when the order is delivered.
- **Indian_Mobile_Number**: A 10-digit number whose first digit is 6, 7, 8, or 9, used with the +91 country code.
- **OTP**: A 6-digit one-time password sent by SMS to an Indian_Mobile_Number.
- **Brand_Theme**: The Storefront's visual design tokens: Gold #CC9C52, Bronze #7E531E, Background #FDFCF9, Card Surface #F7F3EE, Border #E8DDD2; Playfair Display for headings, DM Sans for body text, Hanken Grotesk for buttons and labels.

## Requirements

### Requirement 1: Brand Theme and Typography

**User Story:** As Nutraciti International, I want the Storefront to use the brand's colours and fonts consistently, so that the site reflects a premium skincare brand.

#### Acceptance Criteria

1. THE Storefront SHALL define the Brand_Theme colours as named Tailwind CSS theme tokens: gold (#CC9C52), bronze (#7E531E), background (#FDFCF9), surface (#F7F3EE), and border (#E8DDD2), and SHALL apply these five colours to components only through those tokens, with no literal occurrence of these five hex values in component styles outside the theme definition.
2. THE Storefront SHALL render the page background of every page in the background token colour #FDFCF9.
3. THE Storefront SHALL render product cards and content panels with a background in the surface token colour #F7F3EE and a 1-pixel or wider border in the border token colour #E8DDD2.
4. THE Storefront SHALL render all heading elements (h1 to h6) in Playfair Display, with a serif generic font family as the fallback.
5. THE Storefront SHALL render body text, defined as all text not covered by criteria 4 and 6, in DM Sans, with a sans-serif generic font family as the fallback.
6. THE Storefront SHALL render buttons, form labels, badges, and navigation labels in Hanken Grotesk, with a sans-serif generic font family as the fallback.
7. WHEN a page loads, THE Storefront SHALL load Playfair Display, DM Sans, and Hanken Grotesk through the Next.js font optimisation system and SHALL display text in the fallback font named in criteria 4 to 6 until each font finishes loading, so that no text is invisible while a font is loading.
8. THE Storefront SHALL display normal-size text (below 18pt, or below 14pt bold) with a contrast ratio of at least 4.5:1 against its background, as defined by WCAG 2.1 AA.
9. THE Storefront SHALL display large text (18pt or above, or 14pt bold or above) with a contrast ratio of at least 3:1 against its background, as defined by WCAG 2.1 AA.
10. THE Storefront SHALL use the gold token colour #CC9C52 only for fills, borders, icons, and badge backgrounds, and SHALL render all coloured (non-black, non-white) text in the bronze token colour #7E531E, because gold text measures about 2.4:1 against the background colour and fails criteria 8 and 9; any text placed on a gold fill SHALL meet criteria 8 and 9 against that fill.
11. IF a brand font fails to load, THEN THE Storefront SHALL keep displaying the affected text in the fallback font named in criteria 4 to 6, with all text remaining visible and readable, and without a page error.

### Requirement 2: Site Layout and Navigation

**User Story:** As a Customer, I want a consistent header and footer on every page, so that I can reach any part of the site.

#### Acceptance Criteria

1. THE Storefront SHALL display a header on every page containing the Nutraciti International logo linking to the Homepage, links to Home, Shop, Track My Order, and About Us, an account link, a wishlist icon linking to the Wishlist page, and a cart icon linking to the Cart page.
2. WHILE the Cart contains at least one Cart_Item, THE Storefront SHALL display on the cart icon a badge showing the total quantity of all Cart_Items, shown as "99+" when the total exceeds 99, and updated within 1 second of any Cart_Service add, update, or remove action without a page reload.
3. WHILE the viewport width is below 768 pixels, THE Storefront SHALL hide the Home, Shop, Track My Order, and About Us header links and display a menu button in their place, while keeping the logo, account link, wishlist icon, and cart icon visible in the header.
4. THE Storefront SHALL display a footer on every page containing a link to About Us, contact details consisting of at least one email address and one phone number, and a link to each configured Nutraciti social media profile that opens in a new browser tab.
5. WHEN a Customer requests a URL that matches no page and no active Product in the Product_Catalog, THE Storefront SHALL display a "Page not found" page, including the standard header and footer, with a link to the Homepage, and return HTTP status 404.
6. WHILE the Cart contains zero Cart_Items, THE Storefront SHALL display the cart icon without a badge.
7. WHILE the viewport width is below 768 pixels, WHEN a Customer selects the menu button, THE Storefront SHALL open a menu listing the Home, Shop, Track My Order, and About Us links, and SHALL close the menu when the Customer selects a link in it or selects the menu button again.
8. THE Storefront SHALL direct the header account link to the sign-in page for a Guest_Customer and to the account page for an Authenticated_Customer.
9. THE Storefront SHALL display in the header account menu of an Authenticated_Customer a "My Wishlist" link to the Wishlist page, and WHERE the Authenticated_Customer is an Admin, an additional "Admin Dashboard" link to the Admin_Dashboard.
10. WHEN a Guest_Customer selects the header wishlist icon, THE Storefront SHALL redirect the Guest_Customer to the Login page with the Wishlist page recorded as the return destination, as described in Requirement 8, criterion 4.

### Requirement 3: Homepage

**User Story:** As a Customer, I want an attractive Homepage that shows the brand and its best products, so that I can start shopping quickly.

#### Acceptance Criteria

1. THE Storefront SHALL display at the top of the Homepage a hero section containing a headline, one supporting line of text, and a "Shop Now" button that navigates to the Product Listing page with no category filter applied.
2. THE Storefront SHALL display on the Homepage a featured products section showing between 1 and 8 active Products marked as featured in the Product_Catalog, where each Product card shows the Product's first image, name, Selling_Price and MRP formatted by the Price_Formatter, and links to that Product's detail page.
3. THE Storefront SHALL display on the Homepage a product category section with exactly one link for each category that contains at least one active Product, where each link navigates to the Product Listing page filtered by that category.
4. THE Storefront SHALL display on the Homepage a brand promise section containing an ingredient quality statement, a cruelty-free statement, the Free_Shipping_Threshold amount formatted by the Price_Formatter, and a statement that COD is available.
5. IF the Product_Catalog contains no featured active Products, THEN THE Storefront SHALL hide the featured products section on the Homepage, showing no section heading and no empty placeholder.
6. IF the Product_Catalog contains no category with at least one active Product, THEN THE Storefront SHALL hide the product category section on the Homepage, showing no section heading and no empty placeholder.
7. IF the Product_Catalog cannot be read when the Homepage loads, THEN THE Storefront SHALL hide the featured products section and the product category section and still display the hero section and the brand promise section, without showing an error page.
8. THE Storefront SHALL render all Homepage sections using the Brand_Theme, with section headings in Playfair Display, body text in DM Sans, and buttons and labels in Hanken Grotesk.

### Requirement 4: Product Listing

**User Story:** As a Customer, I want to browse, filter, and sort products, so that I can find the skincare products I need.

#### Acceptance Criteria

1. WHEN a Customer opens the Product Listing page without filter or sort query parameters, THE Storefront SHALL display every active Product in the Product_Catalog as a product card, including Products whose stock quantity is zero, ordered by the "Newest" sort option.
2. THE Storefront SHALL display on each product card the Product's primary image, name, Selling_Price formatted by the Price_Formatter, and an "Add to Cart" button.
3. WHERE a Product's Selling_Price is less than the Product's MRP, THE Storefront SHALL display on the product card the MRP formatted by the Price_Formatter with a strikethrough, and the discount percentage calculated as ((MRP − Selling_Price) ÷ MRP) × 100 and rounded down to the nearest whole number (for example, MRP ₹999 and Selling_Price ₹799 display as 20% off).
4. WHEN a Customer selects a category filter, THE Storefront SHALL display only active Products belonging to the selected category, with at most one category selected at a time and an "All" option that displays active Products from every category.
5. WHEN a Customer selects a sort option of "Price: Low to High", "Price: High to Low", or "Newest", THE Storefront SHALL order the displayed Products by Selling_Price ascending, by Selling_Price descending, or by the date the Product was added to the Product_Catalog with the most recent first, respectively, and SHALL order Products with equal sort values by name in ascending alphabetical order.
6. WHEN a Customer changes the category filter, sort option, or page number, THE Storefront SHALL write the selected category, sort option, and page number to the page URL query parameters, and SHALL reset the page number to 1 when the category filter or sort option changes.
7. WHEN a Customer opens a Product Listing URL containing valid category, sort, and page query parameters, THE Storefront SHALL display the Products for that category, sort option, and page, and SHALL show that category and sort option as selected in the filter and sort controls.
8. WHILE a Product's stock quantity is zero, THE Storefront SHALL display an "Out of Stock" label on the product card and disable the product card's "Add to Cart" button.
9. IF no active Products match the selected category filter, THEN THE Storefront SHALL display the message "No products found" and a button that, when clicked, removes the category filter, sets the page number to 1, and displays all active Products.
10. WHERE the number of matching Products exceeds 12, THE Storefront SHALL paginate the Product Listing page at 12 Products per page in the selected sort order, display page navigation controls showing the current page number and the total page count, and disable the previous-page control on page 1 and the next-page control on the last page.
11. IF a Product Listing URL contains a category that does not exist in the Product_Catalog, a sort value other than the three defined sort options, or a page number that is not a whole number between 1 and the total page count, THEN THE Storefront SHALL ignore each invalid parameter, apply the default for that parameter ("All" categories, "Newest" sort, or page 1), and update the URL to show the values actually applied.
12. IF the Storefront fails to retrieve Products from the Product_Catalog, THEN THE Storefront SHALL display an error message indicating that products could not be loaded and a "Retry" button that repeats the retrieval with the current filter, sort option, and page number, and SHALL NOT display the "No products found" message.

### Requirement 5: Product Detail

**User Story:** As a Customer, I want to see full product information, so that I can decide whether a product suits my skin.

#### Acceptance Criteria

1. WHEN a Customer opens the Product Detail page for an active Product's slug, THE Storefront SHALL display the Product's name, image gallery, Selling_Price and MRP formatted by the Price_Formatter, description, ingredients, usage instructions, and a stock status of "In stock" when the Product's stock quantity is 1 or more or "Out of stock" when the Product's stock quantity is 0.
2. WHEN a Customer selects a thumbnail in the image gallery, THE Storefront SHALL display the selected image as the main image without reloading the page, and SHALL visually mark the selected thumbnail as the active thumbnail.
3. THE Storefront SHALL display on the Product Detail page a quantity selector that defaults to 1, accepts only whole numbers from 1 to the Max_Item_Quantity, disables the decrement control at 1, disables the increment control at the Max_Item_Quantity, and replaces any entered value below 1, above the Max_Item_Quantity, or not a whole number with the nearest valid value in that range.
4. WHEN a Customer selects "Add to Cart" on the Product Detail page for a Product with a stock quantity of 1 or more, THE Cart_Service SHALL add the Product with the selected quantity to the Cart, and THE Storefront SHALL keep the Customer on the Product Detail page and display for at least 3 seconds a confirmation message that names the Product and the quantity added.
5. WHEN a Customer selects "Buy Now" on the Product Detail page for a Product with a stock quantity of 1 or more, THE Cart_Service SHALL add the Product with the selected quantity to the Cart, and THE Storefront SHALL navigate to the Checkout page after the Cart_Item is added.
6. THE Storefront SHALL display the Pincode_Checker on the Product Detail page.
7. WHEN a Customer opens the Product Detail page for an active Product whose Selling_Price is less than its MRP, THE Storefront SHALL display the text "You save ₹X" where X is MRP − Selling_Price formatted by the Price_Formatter, and for a Product whose Selling_Price equals its MRP, THE Storefront SHALL not display the "You save" text.
8. IF a Customer opens a Product Detail URL whose slug matches no Product, or matches a Product that is not active, THEN THE Storefront SHALL display the "Page not found" page and return HTTP status 404.
9. THE Storefront SHALL generate for each Product Detail page a page title containing the Product's name, a meta description consisting of the first 160 characters or fewer of the Product's description, and an Open Graph image equal to the first image in the Product's image gallery.
10. IF a Customer opens the Product Detail page for an active Product whose stock quantity is 0, THEN THE Storefront SHALL disable the quantity selector, the "Add to Cart" control, and the "Buy Now" control, and SHALL display the stock status "Out of stock".
11. IF a Customer selects "Add to Cart" or "Buy Now" and the Cart already contains a Cart_Item for the Product such that the existing quantity plus the selected quantity exceeds the Max_Item_Quantity, THEN THE Cart_Service SHALL set that Cart_Item's quantity to the Max_Item_Quantity, and THE Storefront SHALL display a message indicating that the maximum quantity for the Product has been reached.
12. IF the Cart_Service fails to add the Product to the Cart after a Customer selects "Add to Cart" or "Buy Now", THEN THE Storefront SHALL keep the Customer on the Product Detail page, leave the Cart unchanged, retain the selected quantity in the quantity selector, and display an error message indicating that the Product could not be added to the Cart.

### Requirement 6: Phone Number OTP Login

**User Story:** As a Customer in India, I want to sign in with my mobile number and an OTP, so that I can log in without a password.

#### Acceptance Criteria

1. THE Storefront SHALL display on the Login page a mobile number field with a fixed, non-editable "+91" prefix that accepts only the digits 0–9 and a maximum of 10 characters.
2. WHEN a Customer submits an Indian_Mobile_Number, THE Auth_Service SHALL request Supabase Auth to send an OTP by SMS to "+91" followed by the submitted 10 digits, and THE Storefront SHALL disable the submit control until Supabase Auth responds or 15 seconds elapse, whichever comes first.
3. IF a Customer submits a mobile number that is not a valid Indian_Mobile_Number (fewer than 10 digits, or a first digit other than 6, 7, 8, or 9), THEN THE Storefront SHALL display the message "Enter a valid 10-digit mobile number", keep the entered digits in the field, and send no OTP request to Supabase Auth.
4. WHEN Supabase Auth confirms the OTP has been sent, THE Storefront SHALL display a 6-digit OTP input and a 30-second countdown, keep the "Resend OTP" option disabled until the countdown reaches 0, and restart the 30-second countdown each time the Customer selects "Resend OTP".
5. WHEN a Customer submits an OTP of exactly 6 digits, THE Auth_Service SHALL verify the OTP with Supabase Auth against the mobile number the OTP was sent to, and THE Storefront SHALL accept only the digits 0–9 in the OTP input and keep the OTP submit control disabled while fewer than 6 digits are entered.
6. WHEN the OTP verification succeeds, THE Auth_Service SHALL create a session for the Customer, making the Customer an Authenticated_Customer, and THE Storefront SHALL redirect the Customer to the page the Customer was on before opening the Login page, or to the home page if no such page exists or that page is the Login page.
7. IF the OTP verification fails because the OTP is incorrect or expired, THEN THE Storefront SHALL display the message "Incorrect or expired OTP", clear the OTP input, keep the OTP input available for another attempt, and create no session.
8. IF Supabase Auth reports a rate limit on OTP requests, THEN THE Storefront SHALL display a message stating the number of seconds the Customer must wait before requesting another OTP, and keep the OTP request and "Resend OTP" controls disabled until that number of seconds has elapsed.
9. WHEN a Customer signs in by OTP and no customer profile exists for that mobile number, THE Auth_Service SHALL create exactly one customer profile in Supabase linked to the Customer's mobile number; WHEN a customer profile already exists for that mobile number, THE Auth_Service SHALL reuse the existing profile and create no new one.
10. IF Supabase Auth returns an error other than a rate limit when sending an OTP, or does not respond within 15 seconds, THEN THE Storefront SHALL display an error message stating that the OTP could not be sent, keep the entered mobile number in the field, and re-enable the submit control so the Customer can try again.
11. IF Supabase Auth returns an error other than an incorrect or expired OTP during verification, or does not respond within 15 seconds, THEN THE Storefront SHALL display an error message stating that verification could not be completed, keep the OTP input and the entered OTP available for resubmission, and create no session.

### Requirement 7: Google Login

**User Story:** As a Customer, I want to sign in with my Google account, so that I can log in with one click.

#### Acceptance Criteria

1. THE Storefront SHALL display a "Continue with Google" button on the Login page, alongside the mobile OTP sign-in option and styled with the Brand_Theme button font (Hanken Grotesk).
2. WHEN a Customer selects "Continue with Google", THE Auth_Service SHALL start the Supabase Auth Google OAuth flow and THE Storefront SHALL disable the "Continue with Google" button and show a loading indicator on it until the Customer leaves the Login page or the flow returns an outcome.
3. WHEN the Google OAuth flow completes successfully, THE Auth_Service SHALL create a session for the Customer and THE Storefront SHALL redirect the Customer to the Storefront page the Customer was on before opening the Login page; IF no such page is recorded, or the recorded page is the Login page or a URL outside the Storefront, THEN THE Storefront SHALL redirect the Customer to the Homepage.
4. IF the Google OAuth flow cannot be started, returns an error, or is cancelled by the Customer, THEN THE Storefront SHALL return the Customer to the Login page, display the message "Google sign-in was not completed", re-enable the "Continue with Google" button, create no session, and keep the Customer's existing guest Cart unchanged.
5. WHEN a Customer signs in with Google for the first time, THE Auth_Service SHALL create one customer profile in Supabase linked to the Customer's Google account and containing the email address and name returned by Google; IF Google returns no name, THEN THE Auth_Service SHALL create the profile with the email address only and leave the name empty.
6. WHEN a Customer who already has a customer profile linked to the Google account signs in with Google again, THE Auth_Service SHALL sign the Customer into that existing profile and SHALL NOT create an additional customer profile.
7. IF the Google OAuth flow succeeds but the Auth_Service fails to create the session or the first-time customer profile, THEN THE Storefront SHALL keep the Customer as a Guest_Customer on the Login page, display an error message indicating that sign-in could not be completed and the Customer can try again, and leave no partially created customer profile in Supabase.

### Requirement 8: Session Management and Protected Pages

**User Story:** As an Authenticated_Customer, I want my session to persist and my account pages to be protected, so that I stay signed in and my data stays private.

#### Acceptance Criteria

1. WHILE a Customer has a valid Supabase session, including after closing and reopening the browser or opening the Storefront in another tab, THE Storefront SHALL display in the header account menu the Customer's profile name if it is non-empty, and otherwise the Customer's Indian_Mobile_Number with only the last 4 digits visible and the first 6 digits masked.
2. WHEN an Authenticated_Customer selects "Sign Out", THE Auth_Service SHALL end the Supabase session and remove the session from the browser, and THE Storefront SHALL redirect the Customer to the Homepage and treat every later request from that browser as coming from a Guest_Customer.
3. WHEN the Storefront receives a page or server request whose Supabase access token has expired and whose refresh token is valid, THE Auth_Service SHALL refresh the session on the server before responding, so that the server-rendered page and the client-rendered page show the same signed-in state on the same page load.
4. WHEN a Guest_Customer requests the Checkout page or a page linked from the header account menu, whether by proceeding from the Cart or by entering the page URL directly, THE Storefront SHALL redirect the Guest_Customer to the Login page with the requested page recorded as the return destination, keep the Cart unchanged, and return the Customer to the recorded page after successful sign-in.
5. WHEN an Authenticated_Customer requests the Login page, THE Storefront SHALL redirect the Authenticated_Customer to the Homepage without displaying the Login page.
6. IF the return destination recorded for the Login page is not a page on the Storefront's own domain, THEN THE Storefront SHALL ignore the recorded destination and redirect the Customer to the Homepage after successful sign-in.
7. IF the Auth_Service cannot refresh a session because the refresh token is expired, revoked, or invalid, THEN THE Auth_Service SHALL remove the session from the browser and THE Storefront SHALL treat the Customer as a Guest_Customer, applying criterion 4 when the requested page is protected.
8. IF the Supabase sign-out request fails, THEN THE Auth_Service SHALL still remove the session from the browser and THE Storefront SHALL redirect the Customer to the Homepage in the signed-out state.

### Requirement 9: Cart Management

**User Story:** As a Customer, I want to add, change, and remove items in my cart, so that I can prepare my order.

#### Acceptance Criteria

1. WHEN a Customer adds an active Product with stock quantity of 1 or more that is not in the Cart, THE Cart_Service SHALL create a Cart_Item for the Product with the selected quantity, where the selected quantity is a whole number from 1 to the Max_Item_Quantity and defaults to 1 if the Customer does not choose one.
2. WHEN a Customer adds a Product that is already in the Cart, THE Cart_Service SHALL increase the existing Cart_Item's quantity by the selected quantity, capped at the Max_Item_Quantity, without creating a second Cart_Item for that Product.
3. WHEN a Customer changes a Cart_Item's quantity to a whole number from 1 to the Max_Item_Quantity, THE Cart_Service SHALL update the Cart_Item to the new quantity.
4. WHEN a Customer selects the remove button on a Cart_Item, THE Cart_Service SHALL delete that Cart_Item from the Cart and leave all other Cart_Items unchanged.
5. IF an add or update would make a Cart_Item's quantity exceed the Max_Item_Quantity, THEN THE Cart_Service SHALL set the quantity to the Max_Item_Quantity and THE Storefront SHALL display the message "Only N units available" where N is the Max_Item_Quantity.
6. THE Storefront SHALL display on the Cart page each Cart_Item's image, name, Selling_Price, MRP, quantity selector, line total (Selling_Price × quantity), and a remove button, with all INR amounts formatted by the Price_Formatter.
7. WHILE the Cart contains 1 or more Cart_Items, THE Storefront SHALL display on the Cart page the Subtotal, the Shipping_Fee, the savings computed by the Savings_Calculator across all Cart_Items, the Coupon_Discount while a Coupon is applied, and the total payable amount equal to Subtotal − Coupon_Discount + Shipping_Fee, all formatted by the Price_Formatter and updated within 1 second after any add, update, or remove operation without a full page reload.
8. WHILE the Cart contains no Cart_Items, THE Storefront SHALL display on the Cart page the message "Your cart is empty" and a "Continue Shopping" button linking to the Product Listing page, and SHALL NOT display the Subtotal, Shipping_Fee, savings, or total payable amount.
9. FOR ALL sequences of add, update, and remove operations, THE Cart_Service SHALL keep every Cart_Item quantity between 1 and the Max_Item_Quantity and keep at most one Cart_Item per Product (invariant).
10. FOR ALL Carts, THE Subtotal SHALL equal the sum of Selling_Price × quantity across all Cart_Items (invariant).
11. IF a Customer attempts to add a Product that is inactive or has a stock quantity of 0, THEN THE Cart_Service SHALL leave the Cart unchanged and THE Storefront SHALL display a message indicating the Product is out of stock.
12. IF a Customer enters a Cart_Item quantity that is less than 1, greater than 10, or not a whole number, THEN THE Cart_Service SHALL keep the Cart_Item's previous quantity and THE Storefront SHALL display a message indicating the allowed range of 1 to the Max_Item_Quantity.
13. WHEN the Cart page loads, THE Cart_Service SHALL check each Cart_Item against the Product's current active status and stock quantity, reduce any quantity above the current Max_Item_Quantity to that Max_Item_Quantity with the message "Only N units available", and remove any Cart_Item whose Product is inactive or has a stock quantity of 0 while displaying a message naming each removed Product.

### Requirement 10: Cart Persistence and Merging

**User Story:** As a Customer, I want my cart to be saved, so that I do not lose items when I reload the page or sign in.

#### Acceptance Criteria

1. WHILE a Customer is a Guest_Customer, WHEN the Customer adds, updates, or removes a Cart_Item, THE Cart_Service SHALL write the full Cart to the browser's local storage using the Cart_Serializer within 1 second of the change.
2. WHILE a Customer is an Authenticated_Customer, WHEN the Customer adds, updates, or removes a Cart_Item, THE Cart_Service SHALL save the full Cart in Supabase linked to the Customer's account within 2 seconds of the change.
3. WHEN a Customer loads or reloads any Storefront page, THE Cart_Service SHALL restore the Cart from local storage for a Guest_Customer, or from Supabase for an Authenticated_Customer, so that the restored Cart contains the same Products and quantities as the last successfully saved Cart.
4. WHEN a Guest_Customer with a non-empty Cart signs in, THE Cart_Service SHALL merge the guest Cart into the Customer's Supabase Cart: for Products present in both Carts it sums the quantities and caps each at the Max_Item_Quantity; for Products present in only one Cart it keeps that Cart_Item unchanged. After the merged Cart is saved to Supabase, THE Cart_Service SHALL remove the guest Cart from local storage.
5. IF the stored Cart text in local storage cannot be parsed, or contains an entry without a Product identifier or with a quantity that is not a positive whole number, THEN THE Cart_Service SHALL remove the stored text from local storage, start with an empty Cart, and keep the Storefront page usable.
6. WHEN the Cart_Service restores or merges a Cart, THE Cart_Service SHALL remove Cart_Items whose Products are inactive or have a Max_Item_Quantity of 0, reduce each quantity that exceeds the current Max_Item_Quantity down to that value, and save the adjusted Cart. THE Storefront SHALL display a message naming each affected Product and stating whether it was removed or had its quantity reduced.
7. THE Cart_Serializer SHALL convert a Cart into a text representation containing each Cart_Item's Product identifier and quantity, and SHALL convert an empty Cart into a text representation that deserializes to an empty Cart.
8. FOR ALL valid Carts, serializing a Cart with the Cart_Serializer and then deserializing the result SHALL produce an equivalent Cart, where equivalent means the same set of Product identifiers with the same quantity for each, regardless of Cart_Item order (round-trip property).
9. FOR ALL pairs of Carts, merging the second Cart into the first SHALL produce a Cart equivalent to the result of merging the first Cart into the second, where equivalent means the same set of Product identifiers with the same quantity for each, regardless of Cart_Item order (confluence property).
10. IF the Cart_Service cannot read the Cart from Supabase or save it to Supabase within 10 seconds, THEN THE Storefront SHALL display an error message indicating that the Cart could not be loaded or saved, offer a retry action, and keep the Cart shown on the page unchanged without overwriting the Supabase Cart with an empty Cart.
11. IF saving the merged Cart to Supabase fails during sign-in, THEN THE Cart_Service SHALL keep the guest Cart in local storage unchanged and display an error message indicating that the guest Cart items could not be merged, and SHALL retry the merge the next time the Authenticated_Customer loads a Storefront page.
12. WHEN an Authenticated_Customer signs out, THE Cart_Service SHALL keep the Cart stored in Supabase, clear the Cart displayed in the browser, and start the now Guest_Customer with an empty Cart in local storage.

### Requirement 11: Pincode Delivery Checker

**User Story:** As a Customer, I want to check whether my pincode is serviceable, so that I know whether and when my order can be delivered.

#### Acceptance Criteria

1. THE Pincode_Checker SHALL provide a text input that accepts at most 6 characters, ignores any non-digit character the Customer types or pastes, and submits the entered value when the Customer activates the check button or presses the Enter key.
2. WHEN a Customer submits a Serviceable_Pincode, THE Pincode_Checker SHALL display the message "Delivery available" with the estimated delivery date, calculated as the current date in Indian Standard Time plus the Serviceable_Pincode's estimated delivery days and shown as the day of the month followed by the abbreviated month name (for example, "18 Jan").
3. WHEN a Customer submits a Serviceable_Pincode, THE Pincode_Checker SHALL display a COD status message: one indicating COD is available if the Serviceable_Pincode's COD availability flag is true, or one indicating COD is not available if the flag is false.
4. IF a Customer submits a valid Pincode that is not a Serviceable_Pincode, THEN THE Pincode_Checker SHALL display the message "Sorry, we do not deliver to this pincode yet" and display no estimated delivery date or COD status.
5. IF a Customer submits an input that is not a valid Pincode (empty, fewer than 6 digits, or a first digit of 0), THEN THE Pincode_Checker SHALL display the message "Enter a valid 6-digit pincode", keep the entered value in the input, and send no lookup request.
6. WHEN a Customer submits a valid Pincode, THE Storefront SHALL store that Pincode in the browser's local storage, replacing any previously stored Pincode.
7. WHEN the Pincode_Checker receives a valid Pincode, THE Pincode_Checker SHALL display the lookup result within 2 seconds, measured from submission to the result message appearing.
8. WHEN the Pincode_Checker is displayed and the browser's local storage holds a stored Pincode, THE Pincode_Checker SHALL pre-fill the input with the stored Pincode without automatically submitting a lookup.
9. WHILE a Pincode lookup is in progress, THE Pincode_Checker SHALL display a loading indicator and disable the check button so that no second lookup can be submitted until the first one completes or fails.
10. IF a Pincode lookup fails or returns no response within 10 seconds of submission, THEN THE Pincode_Checker SHALL hide the loading indicator, display an error message indicating the delivery check could not be completed, keep the entered Pincode in the input, and re-enable the check button so the Customer can retry.

### Requirement 12: Savings Display

**User Story:** As a Customer, I want to see how much I save compared with MRP, so that I understand the value of my purchase.

#### Acceptance Criteria

1. WHEN a Cart_Item is added to the Cart, a Cart_Item quantity is updated, or a Cart_Item is removed from the Cart, THE Savings_Calculator SHALL recompute Cart savings as the sum of (MRP − Selling_Price) × quantity across all Cart_Items, using each Product's current MRP and Selling_Price from the Product_Catalog, and excluding the Shipping_Fee and COD_Fee.
2. WHILE the Cart savings are greater than zero, THE Storefront SHALL display "You saved ₹X" on the Cart page and the Checkout order summary, where X is the Cart savings formatted by the Price_Formatter, and the value of X SHALL be identical on both pages for the same Cart.
3. WHILE the Cart savings equal zero, including when the Cart contains no Cart_Items, THE Storefront SHALL hide the "You saved ₹X" message on the Cart page and the Checkout order summary.
4. WHEN an Order is placed with savings greater than zero, THE Storefront SHALL display "You saved ₹X on this order" on the order confirmation page, where X is the sum of (MRP − Selling_Price) × quantity across the Order's line items, using the MRP and Selling_Price recorded on the Order at the time of placement, formatted by the Price_Formatter.
5. FOR ALL Carts, the Cart savings SHALL be greater than or equal to zero (invariant).
6. FOR ALL Carts, the Cart savings plus the Subtotal SHALL equal the sum of MRP × quantity across all Cart_Items (invariant).
7. WHEN the Cart savings change while the Cart page or Checkout order summary is displayed, THE Storefront SHALL update the displayed "You saved ₹X" message, or show or hide it per criteria 2 and 3, within 1 second and without a full page reload.
8. WHEN an Order is placed with savings equal to zero, THE Storefront SHALL hide the "You saved ₹X on this order" message on the order confirmation page.

### Requirement 13: Indian Rupee Price Formatting

**User Story:** As a Customer in India, I want prices shown in the familiar Indian format, so that amounts are easy to read.

#### Acceptance Criteria

1. WHEN the Price_Formatter receives an amount as a whole number of paise between 0 and 9,999,999,999 inclusive, THE Price_Formatter SHALL output the ₹ symbol followed directly by the rupee part with no space, using Indian digit grouping: no separator for rupee parts below 1,000, then a comma before the last three digits and a comma between each earlier group of two digits (for example, 0 paise → ₹0, 99,900 paise → ₹999, 1,23,45,600 paise → ₹1,23,456, 10,00,00,000 paise → ₹10,00,000).
2. IF an amount has a non-zero paise component (amount in paise not divisible by 100), THEN THE Price_Formatter SHALL append a decimal point and exactly two paise digits, zero-padded on the left (for example, 5 paise → ₹0.05, 1,23,45,650 paise → ₹1,23,456.50).
3. IF an amount has a zero paise component (amount in paise divisible by 100), THEN THE Price_Formatter SHALL output the amount with no decimal point and no decimal digits (for example, 1,50,000 paise → ₹1,500, not ₹1,500.00).
4. THE Storefront SHALL display every INR amount shown to a Customer, including MRP, Selling_Price, Subtotal, Shipping_Fee, COD_Fee, COD_Limit, Free_Shipping_Threshold, Order_Total, and Savings_Calculator results, on every page where it appears, in the exact output produced by the Price_Formatter.
5. FOR ALL whole-number paise amounts between 0 and 9,999,999,999 inclusive, parsing the Price_Formatter output back into paise SHALL produce the original amount (round-trip property).
6. IF the Price_Formatter receives an amount that is negative, not a whole number of paise, not a finite number, or greater than 9,999,999,999 paise, THEN THE Price_Formatter SHALL reject the amount with an error indicating an invalid amount and SHALL NOT return a formatted string.
7. THE Price_Formatter SHALL return the same output string for the same input amount on every call, and that output SHALL not depend on the Customer's browser or device locale settings.

### Requirement 14: Checkout Delivery Address

**User Story:** As an Authenticated_Customer, I want to enter or choose a delivery address, so that my order reaches me.

#### Acceptance Criteria

1. THE Checkout_Service SHALL collect a delivery address containing full name (2 to 100 characters), Indian_Mobile_Number (exactly 10 digits), address line 1 (1 to 150 characters), optional address line 2 (0 to 150 characters), city (2 to 50 characters), state, and Pincode (exactly 6 digits).
2. THE Storefront SHALL display the state field as a selection list containing all 28 Indian states and 8 union territories, with no state preselected.
3. IF a Customer submits the address form with a required field empty or containing only whitespace, a field outside its character limit, an Indian_Mobile_Number that does not match the Indian_Mobile_Number definition, or a Pincode that does not match the Pincode definition, THEN THE Storefront SHALL display a field-level error message next to each invalid field, keep the Customer on the address step, and keep all values the Customer entered.
4. IF the Pincode of a submitted or selected delivery address is not a Serviceable_Pincode, THEN THE Checkout_Service SHALL block progression to payment and THE Storefront SHALL display the message "Sorry, we do not deliver to this pincode yet", keep the Customer on the address step, and keep all values the Customer entered.
5. WHEN a Customer submits a delivery address that passes field validation and whose Pincode is a Serviceable_Pincode, THE Checkout_Service SHALL save the address to the Customer's account in Supabase and advance the Customer to the payment step.
6. WHILE an Authenticated_Customer has one or more saved addresses, THE Storefront SHALL display up to 10 saved addresses for selection on the Checkout page, ordered from most recently saved to oldest, each showing full name, Indian_Mobile_Number, address lines, city, state, and Pincode, alongside an option to enter a new address.
7. WHEN an Authenticated_Customer selects a saved address and confirms it, THE Checkout_Service SHALL check whether its Pincode is a Serviceable_Pincode and, if it is, advance the Customer to the payment step without creating a duplicate saved address.
8. IF saving the delivery address to Supabase fails, THEN THE Storefront SHALL display an error message indicating the address could not be saved, keep the Customer on the address step with all entered values retained, and allow the Customer to resubmit.
9. IF the Serviceable_Pincode check cannot be completed because the Supabase pincode lookup fails or does not respond within 10 seconds, THEN THE Checkout_Service SHALL block progression to payment and THE Storefront SHALL display an error message indicating the pincode could not be verified, keep all entered values, and allow the Customer to retry.

### Requirement 15: Checkout Order Summary and Totals

**User Story:** As a Customer, I want a clear order summary before paying, so that I know exactly what I will pay.

#### Acceptance Criteria

1. THE Storefront SHALL display on the Checkout page an order summary listing each Cart_Item with Product name, quantity, and line total (Selling_Price × quantity), followed in this order by the Subtotal, Coupon_Discount, Shipping_Fee, COD_Fee, savings, Order_Total, and GST breakdown, where the Coupon_Discount row appears only while a Coupon is applied and shows the applied Coupon code, the COD_Fee row appears only while COD is the selected payment method, the savings line follows Requirement 12, the GST breakdown follows Requirement 34, and every amount is formatted by the Price_Formatter.
2. WHILE the Discounted_Subtotal is at or above the Free_Shipping_Threshold, THE Checkout_Service SHALL set the Shipping_Fee to zero, and THE Storefront SHALL display the text "FREE" in place of the Shipping_Fee amount and hide the "Add ₹X more for free shipping" message.
3. WHILE the Discounted_Subtotal is below the Free_Shipping_Threshold, THE Storefront SHALL display the configured Shipping_Fee amount and the message "Add ₹X more for free shipping", where X is the Free_Shipping_Threshold minus the Discounted_Subtotal, is greater than zero, and is formatted by the Price_Formatter.
4. WHEN a Customer places an Order, THE Checkout_Service SHALL recalculate the Subtotal, Coupon_Discount, Shipping_Fee, COD_Fee, Order_Total, and GST_Amount on the server from the current Product_Catalog Selling_Prices and GST_Rates, the applied Coupon as re-validated under Requirement 33, and the configured Free_Shipping_Threshold, Shipping_Fee, and COD_Fee, and SHALL store these server-computed amounts in the Order, ignoring any amounts submitted by the browser.
5. IF, at the time a Customer places an Order, any Cart_Item's current Selling_Price differs from the Selling_Price shown in the order summary, or the Product's stock quantity is below the Cart_Item quantity, or the Product is inactive, THEN THE Checkout_Service SHALL create no Order and start no payment, and THE Storefront SHALL keep the entered delivery address and selected payment method and display a message naming each affected Product and whether its price, its available stock, or its availability changed.
6. FOR ALL Carts, Coupons, and payment methods, THE Order_Total SHALL equal Subtotal − Coupon_Discount + Shipping_Fee + COD_Fee exactly, with all amounts held as whole paise and no rounding applied, where Coupon_Discount is zero when no Coupon is applied and COD_Fee is zero for non-COD payment methods, in both the order summary and the stored Order (invariant).
7. WHEN a Customer changes the selected payment method, applies or removes a Coupon, or a Cart_Item changes while the Checkout page is open, THE Storefront SHALL update the Subtotal, Coupon_Discount, Shipping_Fee, COD_Fee, savings, Order_Total, and GST breakdown in the order summary within 1 second.
8. IF order placement is stopped under criterion 5, THEN THE Cart_Service SHALL set each affected Cart_Item to the Product's current Selling_Price, reduce its quantity to the Max_Item_Quantity when stock is below the Cart_Item quantity, remove the Cart_Item when the Product is inactive or has zero stock, and THE Storefront SHALL show the order summary again with recalculated amounts.
9. IF the Cart contains no Cart_Items when a Customer opens the Checkout page or after the Cart update in criterion 8, THEN THE Storefront SHALL redirect the Customer to the Cart page and SHALL NOT allow order placement.

### Requirement 16: Razorpay Online Payment

**User Story:** As a Customer, I want to pay with UPI, card, or NetBanking, so that I can pay the way I prefer.

#### Acceptance Criteria

1. THE Storefront SHALL offer on the Checkout page the payment methods "Pay Online (UPI / Card / NetBanking)" and "Cash on Delivery".
2. WHEN a Customer submits the Checkout page with "Pay Online" selected, THE Checkout_Service SHALL, on the server, compute the Order_Total from current Selling_Prices, the re-validated Coupon_Discount, and the Shipping_Fee with no COD_Fee, create an Order with payment method "Online", payment status "pending", and no Fulfilment_Status, and create a Razorpay order whose amount equals the Order_Total after the Coupon_Discount in paise as a whole number (Order_Total × 100, for example ₹1,249.00 becomes 124900).
3. WHEN the Razorpay order has been created, THE Storefront SHALL open the Razorpay Checkout for the Razorpay order amount with the UPI, Card, and NetBanking methods enabled, with the name and Indian_Mobile_Number pre-filled from the delivery address, and with the email field pre-filled only when the Customer has provided an email address.
4. WHEN the Razorpay Checkout reports a successful payment, THE Payment_Verifier SHALL verify on the server, using the Razorpay key secret, that the Razorpay payment signature matches the Razorpay order ID and payment ID belonging to the Order, before the Order's payment status is set to "paid".
5. WHEN the Payment_Verifier confirms a valid signature, THE Checkout_Service SHALL set the Order payment status to "paid", set the Fulfilment_Status to "Placed", reduce each Product's stock quantity by that Product's ordered quantity, and leave the Cart with zero Cart_Items, applying all four changes so that either all of them or none of them take effect, and THE Storefront SHALL display the order confirmation page showing the Order_Number and the Order_Total.
6. IF the Payment_Verifier finds an invalid signature, THEN THE Checkout_Service SHALL set the Order payment status to "failed" and leave the Order without a Fulfilment_Status and the Product stock and Cart unchanged, and THE Storefront SHALL display the message "Payment could not be verified" with a retry payment option that reopens the Razorpay Checkout for the same Order and Order_Total without creating a second Order.
7. IF the Customer closes the Razorpay Checkout before completing payment or the Razorpay Checkout reports a failed payment, THEN THE Checkout_Service SHALL keep the Order payment status "pending" when the Checkout was closed or set it to "failed" when the payment failed, and THE Storefront SHALL keep the Cart_Items and quantities unchanged and display the message "Payment was not completed" with two options: retry payment, which reopens the Razorpay Checkout for the same Order without creating a second Order, and choose COD, which is offered only when the Order_Total including the COD_Fee is at or below the COD_Limit and the delivery Serviceable_Pincode has COD available.
8. WHEN Razorpay sends a payment webhook event, THE Payment_Verifier SHALL verify the webhook signature using the Razorpay webhook secret and, for a valid signature, find the Order by its Razorpay order ID and set its payment status to "paid" for a captured-payment event or "failed" for a failed-payment event, applying the Fulfilment_Status, stock, and Cart changes from criterion 5 when the payment status becomes "paid".
9. WHEN the Payment_Verifier receives a payment confirmation or a payment failure, from the Razorpay Checkout or a webhook event, for an Order already marked "paid", THE Checkout_Service SHALL leave the Order's payment status, Fulfilment_Status, Product stock, and Cart unchanged, so that stock is reduced exactly once per Order.
10. IF the Razorpay order cannot be created because Razorpay returns an error or does not respond within 10 seconds, THEN THE Checkout_Service SHALL set the Order payment status to "failed" and leave Product stock and the Cart unchanged, and THE Storefront SHALL keep the Customer on the Checkout page with an error message indicating that online payment is unavailable and the options to retry "Pay Online" or choose "Cash on Delivery".
11. IF a webhook event has an invalid signature or its Razorpay order ID matches no Order, THEN THE Payment_Verifier SHALL reject the event and leave every Order, all Product stock, and every Cart unchanged.
12. IF the Storefront receives no verification result from the Payment_Verifier within 15 seconds after the Razorpay Checkout reports a successful payment, THEN THE Storefront SHALL display a message indicating that the payment is being confirmed, keep the Order payment status "pending" until a verification result or webhook event updates it, and withhold the retry payment option for that Order.
13. IF the Order_Total after the Coupon_Discount is below ₹1, THEN THE Storefront SHALL display the "Pay Online" option as disabled with the message "Online payment needs an order total of at least ₹1", and THE Checkout_Service SHALL create no Razorpay order for that Cart.

### Requirement 17: Cash on Delivery

**User Story:** As a Customer in India, I want to pay in cash when my order arrives, so that I can buy without paying online.

#### Acceptance Criteria

1. WHILE the delivery Pincode is a Serviceable_Pincode whose COD availability flag is true and the Order_Total including the COD_Fee is less than or equal to the COD_Limit, THE Storefront SHALL display the "Cash on Delivery" payment option as enabled and selectable.
2. WHILE no valid Pincode has been entered for the delivery address, or the delivery Pincode is not a Serviceable_Pincode, or the delivery Pincode's COD availability flag is false, or the Order_Total including the COD_Fee exceeds the COD_Limit, THE Storefront SHALL display the "Cash on Delivery" option as disabled and non-selectable, with a message next to the option that names the specific reason: no Pincode entered, COD not available for the entered Pincode, or Order_Total above the COD_Limit (the last case also shows the COD_Limit amount formatted by the Price_Formatter).
3. WHEN a Customer selects "Cash on Delivery", THE Storefront SHALL show the COD_Fee as a separate line in the order summary, formatted by the Price_Formatter, and show the Order_Total increased by exactly the COD_Fee, within 1 second of the selection.
4. WHEN a Customer places an Order with "Cash on Delivery", THE Checkout_Service SHALL re-check on the server, using server-side Product prices, stock quantities, COD_Fee, COD_Limit, and Serviceable_Pincode data, that the delivery Pincode is a Serviceable_Pincode with COD available, that the Order_Total including the COD_Fee is less than or equal to the COD_Limit, and that every Cart_Item quantity is less than or equal to the Product's current stock quantity. If all checks pass, THE Checkout_Service SHALL create exactly one Order with a unique Order_Number, payment method "COD", payment status "pending", and Fulfilment_Status "Placed".
5. IF the server-side check finds the Order ineligible for COD, finds a Cart_Item quantity above the Product's current stock quantity, or fails to create the Order, THEN THE Checkout_Service SHALL create no Order and leave all Product stock quantities unchanged, and THE Storefront SHALL keep the Customer on the Checkout page with the Cart, delivery address, and payment selection kept, and display an error message that states the reason (COD unavailable for the Pincode, Order_Total above the COD_Limit, the names of the Products with insufficient stock, or that the Order could not be placed).
6. WHEN the Checkout_Service creates a COD Order, THE Checkout_Service SHALL reduce each ordered Product's stock quantity by its ordered quantity in the same operation as Order creation and empty the Cart, and THE Storefront SHALL display the order confirmation page showing the Order_Number, the Order_Total including the COD_Fee, and "Cash on Delivery" as the payment method.
7. IF "Cash on Delivery" is selected and a change to the delivery Pincode or the Cart makes the Order fail any condition in criterion 1, THEN THE Storefront SHALL clear the "Cash on Delivery" selection, remove the COD_Fee from the order summary and Order_Total, and display the reason as described in criterion 2.
8. WHILE a COD Order placement request is waiting for a response from the Checkout_Service, THE Storefront SHALL disable the place-order control so that repeated clicks submit no further placement requests.

### Requirement 18: Order Confirmation

**User Story:** As a Customer, I want a confirmation after placing my order, so that I know the order went through.

#### Acceptance Criteria

1. WHEN the Checkout_Service sets an Order's Fulfilment_Status to "Placed", THE Checkout_Service SHALL assign the Order an Order_Number that no other Order has, and SHALL keep that Order_Number unchanged for the life of the Order.
2. WHEN the Authenticated_Customer who placed a Placed_Order opens that Order's confirmation page, THE Storefront SHALL display the Order_Number, each ordered item's Product name, quantity, and line total (Selling_Price × quantity), the delivery address, the payment method ("Pay Online" or "Cash on Delivery"), the Subtotal, the applied Coupon code and Coupon_Discount (Orders with a Coupon only), Shipping_Fee, COD_Fee (COD Orders only), Order_Total, the GST breakdown described in Requirement 34, the savings computed by the Savings_Calculator across the Order's line items, and the estimated delivery date calculated as the date the Order became a Placed_Order plus the estimated delivery days of the delivery Pincode's Serviceable_Pincode, with all INR amounts formatted by the Price_Formatter.
3. IF a Guest_Customer, an Authenticated_Customer other than the one who placed the Order, or any Customer requesting an Order that does not exist requests an order confirmation page, THEN THE Storefront SHALL display the "Page not found" page and SHALL NOT display any Order details.
4. WHEN two or more Orders that include the same Product become Placed_Orders concurrently, THE Checkout_Service SHALL reduce that Product's stock so that the resulting stock quantity equals the starting stock quantity minus the total quantity across all of those Placed_Orders, and SHALL NOT let the stock quantity fall below zero.
5. IF the quantity of any Cart_Item exceeds that Product's stock quantity when the Customer places the Order, THEN THE Checkout_Service SHALL reject the Order without creating a Razorpay order, assigning an Order_Number, or changing stock, and THE Storefront SHALL keep the Cart unchanged, keep the Customer on the Checkout page, and display the message "Some items are no longer available in the requested quantity" together with the names of the affected Products.
6. WHEN the Authenticated_Customer who placed a Placed_Order reloads or later revisits that Order's confirmation page, THE Storefront SHALL display the same details, using the Product name, MRP, Selling_Price, GST_Rate, Coupon_Discount, and amounts recorded on the Order when the Order was placed rather than current Product_Catalog values, including when the Product has since been edited or become an Archived_Product, and THE Checkout_Service SHALL NOT create another Order or change stock.
7. IF the Authenticated_Customer who placed an Order requests that Order's confirmation page while the Order's payment status is "pending" or "failed", THEN THE Storefront SHALL NOT display the order confirmation page and SHALL display the message "Payment was not completed" with an option to retry payment.

### Requirement 19: About Us Page

**User Story:** As a Customer, I want to learn about Nutraciti International, so that I can trust the brand.

#### Acceptance Criteria

1. WHEN a Customer opens the About Us page, THE Storefront SHALL display three separate sections, each with its own visible heading and at least one paragraph of body text, in this order: brand story, mission and values, and ingredient philosophy.
2. WHEN a Customer opens the About Us page, THE Storefront SHALL display a contact details section containing the company's email address, phone number, and registered postal address, all as visible text.
3. WHEN a Customer selects the email address in the About Us contact details section, THE Storefront SHALL open the Customer's default email application with the company email address pre-filled as the recipient.
4. WHEN a Customer selects the phone number in the About Us contact details section, THE Storefront SHALL start a call to that number on devices that support calling, and THE Storefront SHALL display the phone number with the +91 country code followed by the 10-digit number.
5. THE Storefront SHALL display on the About Us page the same email address, phone number, and registered address shown in the footer contact details (Requirement 2, criterion 4).
6. WHEN a Customer selects the "Shop Now" button on the About Us page, THE Storefront SHALL navigate to page 1 of the Product Listing page with no category or other filters applied.

### Requirement 20: Responsive Design and Accessibility

**User Story:** As a Customer on any device, I want the site to work well on my phone, tablet, or computer, so that I can shop comfortably.

#### Acceptance Criteria

1. THE Storefront SHALL render every page at every viewport width from 320 CSS pixels to 1920 CSS pixels without horizontal scrolling and without any text, image, or interactive element being clipped by, or overlapping, another element.
2. THE Storefront SHALL size every button, link, form control, and icon-only control to a touch target of at least 44 × 44 CSS pixels at every viewport width from 320 CSS pixels to 1920 CSS pixels, except links placed inline within a sentence of body text.
3. THE Storefront SHALL give every product image alternative text that contains the Product name and is at most 125 characters long, SHALL give every informative content image alternative text of at most 125 characters that describes the image content, and SHALL give every decorative image empty alternative text so that assistive technologies skip it.
4. THE Storefront SHALL make every interactive element reachable with the Tab and Shift+Tab keys in an order that matches the visual reading order, SHALL let users activate links with Enter and activate buttons, checkboxes, and radio buttons with Enter or Space, and SHALL not trap keyboard focus anywhere except inside an open modal dialog, which SHALL close when the user presses Escape and SHALL then return focus to the element that opened it.
5. THE Storefront SHALL programmatically associate every form input with a visible text label that stays visible while the input contains a value, and SHALL NOT use placeholder text as the only label.
6. WHEN an interactive element receives keyboard focus, THE Storefront SHALL display a focus indicator that is at least 2 CSS pixels thick and has a contrast ratio of at least 3:1 against the adjacent background.
7. IF a form submission fails validation, THEN THE Storefront SHALL display an error message next to each invalid input that names the problem in text, programmatically associate each error message with its input, announce the errors to assistive technologies within 1 second of the submission attempt, move keyboard focus to the first invalid input, and keep every value the Customer entered.
8. THE Storefront SHALL display body text with a contrast ratio of at least 4.5:1 against its background, and text at least 24 CSS pixels in size (or at least 18.66 CSS pixels in bold) with a contrast ratio of at least 3:1 against its background.

### Requirement 21: Performance and SEO

**User Story:** As Nutraciti International, I want fast, search-friendly pages, so that customers find the site and stay on it.

#### Acceptance Criteria

1. WHEN a Customer requests the Homepage, Product Listing, Product Detail, or About Us page, THE Storefront SHALL render the page on the server so that the initial HTML response, before any JavaScript runs, contains the page's headings, body text, and, for each Product shown, the Product name, Selling_Price, MRP, and image references.
2. WHEN a page displays a product image, THE Storefront SHALL serve the image through the Next.js image optimisation system at an intrinsic width no greater than the image's rendered CSS width multiplied by the device pixel ratio, rounded up to the next configured image size.
3. THE Storefront SHALL achieve a Largest Contentful Paint of 2.5 seconds or less on the Homepage and Product Detail pages, measured as the median of 3 Lighthouse runs using Lighthouse's default mobile emulation and network throttling against the Vercel production deployment.
4. THE Storefront SHALL provide every page with a page title of 1 to 60 characters and a meta description of 50 to 160 characters, and no two indexable pages SHALL share the same page title or the same meta description.
5. WHEN a Customer requests the Product Detail page of an active Product, THE Storefront SHALL include the Product name in the page title and derive the meta description from that Product's description in the Product_Catalog.
6. THE Storefront SHALL publish a sitemap.xml listing the Homepage, Product Listing, About Us, Track My Order, and the Product Detail page of every active Product, and SHALL exclude Product Detail pages of inactive Products and Archived_Products, the Wishlist page, account pages, order confirmation pages, and every Admin_Dashboard page.
7. WHEN a Product is activated, deactivated, added, or removed in the Product_Catalog, THE Storefront SHALL reflect the change in sitemap.xml within 1 hour.
8. THE Storefront SHALL publish a robots.txt file that states the full URL of sitemap.xml.
9. IF a Customer requests a Product Detail page for a slug that does not exist or belongs to an inactive Product, THEN THE Storefront SHALL display a not-found page that is marked as not to be indexed by search engines.
10. THE Storefront SHALL mark the Wishlist page, account pages, order confirmation pages, and every Admin_Dashboard page as not to be indexed by search engines.

### Requirement 22: Security and Data Protection

**User Story:** As Nutraciti International, I want customer and payment data protected, so that customers can trust the site.

#### Acceptance Criteria

1. THE Storefront SHALL enable Supabase Row Level Security on every Supabase table that holds customer profiles, addresses, Carts, Orders, Wishlists, or Reviews, with policies that allow each Authenticated_Customer to read, insert, update, and delete only rows linked to that Authenticated_Customer's own user ID, and that allow a Guest_Customer to read or write none of these rows, with these exceptions: any Customer may read Reviews of active Products; Customers may update and delete Orders only through the Checkout_Service and Payment_Verifier server code; and Customers may not change the role field of any customer profile, including their own.
2. IF an Authenticated_Customer or Guest_Customer requests to read a profile, address, Cart, Order, or Wishlist row that belongs to another user, THEN THE Storefront SHALL return no data for that row. IF the request is an insert, update, or delete, THEN THE Storefront SHALL also reject it and leave the stored row unchanged.
3. THE Storefront SHALL store the Razorpay key secret, Razorpay webhook secret, and Supabase service role key only in server-only environment variables, so that none of these values appears in any JavaScript bundle, HTML page, or API response delivered to the browser.
4. THE Storefront SHALL perform all order creation, Subtotal, Shipping_Fee, COD_Fee, and Order_Total calculation, payment verification, and stock quantity updates on the server.
5. WHEN the Checkout_Service creates an Order, THE Checkout_Service SHALL compute every line item price from the Product_Catalog's current Selling_Price and SHALL ignore any price, discount, fee, or total value supplied by the browser.
6. WHEN the server receives a form submission or API request body, THE Storefront SHALL validate it before processing, rejecting any request in which a required field is missing or empty, a field has the wrong data type, a free-text field is longer than 255 characters, a Pincode does not match the Pincode definition, a phone number does not match the Indian_Mobile_Number definition, or a Cart_Item quantity falls outside 1 to Max_Item_Quantity.
7. IF a server request fails validation, THEN THE Storefront SHALL return an error response with HTTP status 400 and a message that names each invalid field, and SHALL not create, update, or delete any stored data for that request.
8. IF the Payment_Verifier finds that a Razorpay payment signature or webhook signature does not match, THEN THE Payment_Verifier SHALL reject the request and leave the Order's payment status and Fulfilment_Status unchanged.
9. IF an unexpected server error occurs, THEN THE Storefront SHALL log the error on the server, roll back any partial changes made by that request, and display a generic error message to the Customer that contains no stack trace, database query, table name, file path, or environment variable value.
10. THE Storefront SHALL enable Supabase Row Level Security on the Coupon table and every admin-only table, with policies that allow only an Admin to insert, update, or delete rows, allow only an Admin to read Coupon rows directly, and allow Customers to validate a Coupon code only through the Coupon_Service server code; and on the Product_Catalog and Category tables, with policies that allow any Customer to read active, non-archived rows and allow only an Admin to insert, update, or delete rows.

### Requirement 23: Deployment

**User Story:** As a developer, I want the Storefront deployed on Vercel, so that the site is hosted reliably with preview deployments.

#### Acceptance Criteria

1. WHEN a deployment is triggered on Vercel, THE Storefront SHALL complete the `next build` command with exit status zero and no build errors.
2. THE Storefront SHALL read the Supabase project URL and keys, the Razorpay key ID, key secret, and webhook secret, and the site URL from environment variables, with separate values for preview and production deployments, where production deployments use Razorpay live mode keys.
3. THE Storefront SHALL include a `.env.example` file that lists the name of every environment variable the Storefront reads, with every value left empty.
4. WHILE running on a preview deployment, THE Storefront SHALL use Razorpay test mode keys for every payment request sent to the Payment_Gateway.
5. WHEN a pull request is opened or updated in the Storefront repository, THE Storefront SHALL be deployed to a Vercel preview deployment at a URL that is unique to that pull request and separate from the production URL.
6. IF a required environment variable is missing or empty at build time, THEN THE Storefront SHALL fail the build with a non-zero exit status and an error message that names the missing variable.
7. THE Storefront SHALL make the Razorpay key secret, the Razorpay webhook secret, and any Supabase key with privileges above the public anonymous key available only to server-side code, and SHALL NOT include them in any JavaScript bundle delivered to the browser.

### Requirement 24: Admin Access Control

**User Story:** As Nutraciti International, I want only Admins to reach the Admin_Dashboard, so that Products, Categories, Coupons, and Orders can be changed only by authorised staff.

#### Acceptance Criteria

1. THE Storefront SHALL serve the Admin_Dashboard pages under the /admin path and the Admin_Dashboard server endpoints only to an Admin, checking on the server for every page request and every endpoint request that the requester has an active Supabase session and that the requester's customer profile has the role "admin".
2. THE Storefront SHALL enforce the Admin-only Supabase Row Level Security policies of Requirement 22, criterion 10, on every table that the Admin_Dashboard writes to, so that a request that bypasses the server check in criterion 1 creates, updates, or deletes no stored data.
3. WHEN a Guest_Customer requests an Admin_Dashboard page, THE Storefront SHALL redirect the Guest_Customer to the Login page with the requested Admin_Dashboard page recorded as the return destination, as described in Requirement 8, criterion 4.
4. IF an Authenticated_Customer who is not an Admin requests an Admin_Dashboard page, THEN THE Storefront SHALL display the "Page not found" page described in Requirement 2, criterion 5, return HTTP status 404, and include no Admin_Dashboard content or data in the response.
5. IF a Customer who is not an Admin, including a Guest_Customer, sends a request to an Admin_Dashboard server endpoint, THEN THE Storefront SHALL return HTTP status 403 with no Admin_Dashboard data in the response, and SHALL create, update, or delete no stored data for that request.
6. WHEN the role of an Admin's customer profile is changed from "admin" in Supabase, or the Admin's session ends, THE Storefront SHALL apply criteria 3, 4, and 5 to that Customer's next Admin_Dashboard page request or endpoint request.
7. THE Admin_Dashboard SHALL display on every Admin_Dashboard page a navigation menu with the links "Products", "Categories", "Orders", and "Coupons", each leading to the Admin_Dashboard page of the same name, with the link for the current page visually marked as active.
8. THE Storefront SHALL mark every Admin_Dashboard page as not to be indexed by search engines, as stated in Requirement 21, criterion 10, and SHALL exclude every Admin_Dashboard URL from the sitemap.
9. THE Admin_Dashboard SHALL display no control for viewing or changing the role of any customer profile, so that the role "admin" is assigned and removed only directly in Supabase.
10. IF an Admin_Dashboard server endpoint receives a request that includes a change to the role field of any customer profile, THEN THE Storefront SHALL reject the request with HTTP status 403 and leave every customer profile's role unchanged.
11. FOR ALL combinations of requester type (Guest_Customer, Authenticated_Customer with role "customer" or no profile, Admin) and Admin_Dashboard server endpoint, THE Storefront SHALL create, update, or delete stored data only when the requester is an Admin (authorisation invariant).

### Requirement 25: Admin Product Management

**User Story:** As an Admin, I want to add, edit, and remove Products, so that the Product_Catalog shown to Customers stays accurate.

#### Acceptance Criteria

1. WHEN an Admin opens the Products page of the Admin_Dashboard, THE Admin_Dashboard SHALL list the Products in the Product_Catalog, excluding Archived_Products, showing for each Product the primary image, name, Category name, Selling_Price formatted by the Price_Formatter, stock quantity, and active status, ordered by date added with the most recent first, at 20 Products per page with page navigation controls showing the current page number and the total page count.
2. WHEN an Admin enters a search term, selects a Category filter ("All" or one Category), or selects an active-status filter ("All", "Active", or "Inactive"), THE Admin_Dashboard SHALL list only the Products whose name contains the trimmed search term compared case-insensitively and that match both selected filters, and SHALL reset the page number to 1.
3. IF no Products match the search term and filters, THEN THE Admin_Dashboard SHALL display the message "No products found" and an option that clears the search term and both filters.
4. THE Admin_Dashboard SHALL provide an add form and an edit form for Products with the fields name, slug, description, ingredients, usage instructions, Category, MRP, Selling_Price, GST_Rate, stock quantity, featured flag, active flag, and images, where the edit form opens with the Product's stored values.
5. THE Admin_Dashboard SHALL accept a Product name of 2 to 120 characters after leading and trailing spaces are removed.
6. WHILE an Admin is adding a Product and has not edited the slug field, THE Admin_Dashboard SHALL generate the slug from the name by converting letters to lowercase, replacing each run of characters other than a–z and 0–9 with a single hyphen, and removing leading and trailing hyphens, and SHALL update the slug each time the name changes.
7. THE Admin_Dashboard SHALL allow the Admin to edit the slug and SHALL accept a slug of 1 to 120 characters consisting only of lowercase letters a–z, digits 0–9, and hyphens, that neither starts nor ends with a hyphen; otherwise THE Admin_Dashboard SHALL display the message "Use only lowercase letters, digits, and hyphens".
8. IF the slug equals the slug of another Product in the Product_Catalog, including an Archived_Product, THEN THE Storefront SHALL reject the save with the message "This slug is already used by another product" shown at the slug field.
9. THE Admin_Dashboard SHALL require a description of 1 to 5,000 characters, ingredients of 1 to 2,000 characters, and usage instructions of 1 to 2,000 characters, as exceptions to the 255-character free-text limit of Requirement 22, criterion 6.
10. THE Admin_Dashboard SHALL require a Category selected from the existing Categories, and IF no Category is selected or the selected Category no longer exists, THEN THE Storefront SHALL reject the save with the message "Select a category".
11. THE Admin_Dashboard SHALL accept MRP and Selling_Price entered in rupees as a number greater than 0 and at most ₹1,00,000.00 with up to 2 decimal places, and THE Storefront SHALL store each amount as a whole number of paise equal to the entered rupee amount × 100.
12. IF the Selling_Price is greater than the MRP, THEN THE Storefront SHALL reject the save with the message "Selling price cannot be more than MRP" shown at the Selling_Price field.
13. THE Admin_Dashboard SHALL accept a GST_Rate that is a whole number from 0 to 40, with the add form defaulting the GST_Rate to 18.
14. THE Admin_Dashboard SHALL accept a stock quantity entered by the Admin that is a whole number from 0 to 99,999.
15. THE Admin_Dashboard SHALL require 1 to 8 images per Product, each a JPEG, PNG, or WebP file of at most 5 MB, verified on the server by file content, stored in Supabase Storage, and SHALL allow the Admin to reorder the images, with the first image in the saved order used as the Product's primary image and the saved order used as the image gallery order.
16. IF an Admin adds an image that is not a JPEG, PNG, or WebP file, is larger than 5 MB, or would bring the Product above 8 images, or saves a Product with no images, THEN THE Admin_Dashboard SHALL reject that image or save with the message "Only JPEG, PNG, or WebP images are allowed", "Each image must be 5 MB or smaller", "A product can have at most 8 images", or "Add at least one image", respectively.
17. IF any field fails validation when an Admin saves a Product, THEN THE Admin_Dashboard SHALL display an error message next to each invalid field, keep every entered value and selected image in the form, and THE Storefront SHALL create or update no Product data.
18. IF one or more images fail to upload to Supabase Storage during a save, THEN THE Storefront SHALL save no Product data, remove from Supabase Storage any image uploaded during that save attempt, and THE Admin_Dashboard SHALL display the message "Images could not be uploaded. Try again." while keeping every entered value in the form.
19. WHEN an Admin saves a Product that passes validation, THE Storefront SHALL store all fields and images in one operation and THE Admin_Dashboard SHALL display the message "Product saved".
20. WHEN an Admin selects "Delete" for a Product, THE Admin_Dashboard SHALL display a confirmation dialog naming the Product, and WHEN the Admin cancels the dialog, THE Storefront SHALL leave the Product unchanged.
21. WHEN an Admin confirms deletion of a Product that appears in no Order line item, THE Storefront SHALL permanently delete the Product record and remove its images from Supabase Storage, and THE Admin_Dashboard SHALL display the message "Product deleted".
22. WHEN an Admin confirms deletion of a Product that appears in at least one Order line item, THE Storefront SHALL make the Product an Archived_Product by setting it inactive and archived, keep its record, images, and slug, leave every Order line item unchanged, and THE Admin_Dashboard SHALL display the message "This product is in past orders, so it was archived instead of deleted. Order history is unchanged."
23. WHEN an Admin saves, archives, or deletes a Product, THE Storefront SHALL revalidate the cached Homepage, Product Listing pages, and the affected Product Detail page so that Customers see the change within 60 seconds.
24. FOR ALL Products stored in the Product_Catalog, THE Storefront SHALL hold the MRP and Selling_Price as whole paise greater than 0 with Selling_Price ≤ MRP, the stock quantity as a whole number of 0 or more, and the GST_Rate as a whole number from 0 to 40, and SHALL reject any save request that would break this invariant with the stored Product left unchanged (invariant).
25. FOR ALL rupee amounts from ₹0.01 to ₹1,00,000.00 with up to 2 decimal places, converting the entered amount to paise and back to rupees SHALL produce the entered amount (round-trip property).
26. FOR ALL Product names, the slug generated by criterion 6 SHALL satisfy the slug format of criterion 7 whenever the name contains at least one letter a–z or digit 0–9, and generating a slug from an already generated slug SHALL return the same slug (idempotence).

### Requirement 26: Admin Category Management

**User Story:** As an Admin, I want to add, rename, and delete Categories, so that Products are grouped correctly for browsing.

#### Acceptance Criteria

1. WHEN an Admin opens the Categories page of the Admin_Dashboard, THE Admin_Dashboard SHALL list every Category with its name, slug, and the number of Products in the Category including Archived_Products, ordered by name in ascending alphabetical order.
2. THE Admin_Dashboard SHALL provide an add form and an edit form for Categories with a name field, and SHALL accept a Category name of 2 to 50 characters after leading and trailing spaces are removed.
3. IF the trimmed Category name equals the name of another Category when compared case-insensitively, THEN THE Storefront SHALL reject the save with the message "A category with this name already exists".
4. WHEN an Admin saves a Category, THE Storefront SHALL generate the Category slug from the name using the rule in Requirement 25, criterion 6.
5. IF the generated slug equals the slug of another Category, THEN THE Storefront SHALL reject the save with the message "This name creates the same link as another category. Choose a different name."
6. IF any field fails validation when an Admin saves a Category, THEN THE Admin_Dashboard SHALL display an error message next to the invalid field, keep the entered value in the form, and THE Storefront SHALL create or update no Category data.
7. WHEN an Admin renames a Category, THE Storefront SHALL keep every Product, including every Archived_Product, assigned to that Category, replace the Category slug with the slug generated from the new name, and revalidate the cached Homepage and Product Listing pages so that category links and Product Listing category filters use the new slug within 60 seconds.
8. WHEN a Customer opens a Product Listing URL containing a Category slug that was replaced by a rename, THE Storefront SHALL treat the old slug as a category that does not exist, as described in Requirement 4, criterion 11.
9. IF an Admin selects "Delete" for a Category that contains at least one Product, including an Archived_Product, THEN THE Admin_Dashboard SHALL display the message "This category has N products. Move or delete them first.", where N is the number of Products in the Category including Archived_Products (using "product" instead of "products" when N is 1), and THE Storefront SHALL leave the Category unchanged.
10. WHEN an Admin selects "Delete" for a Category that contains no Products, THE Admin_Dashboard SHALL display a confirmation dialog naming the Category, and WHEN the Admin confirms, THE Storefront SHALL remove the Category and THE Admin_Dashboard SHALL display the message "Category deleted"; WHEN the Admin cancels, THE Storefront SHALL leave the Category unchanged.
11. IF a Product is assigned to a Category between the confirmation dialog opening and the Admin confirming deletion, THEN THE Storefront SHALL check the Product count on the server at deletion time, reject the deletion with the message in criterion 9, and leave the Category unchanged.
12. FOR ALL sets of Categories produced by any sequence of add, rename, and delete requests, THE Storefront SHALL hold Category names that are unique when compared case-insensitively and Category slugs that are unique (invariant).
13. FOR ALL Categories and all renames that pass validation, the set of Products assigned to the Category after the rename SHALL equal the set of Products assigned before the rename (invariant).

### Requirement 27: Admin Order Management and Shipping

**User Story:** As an Admin, I want to view Placed_Orders and update their Fulfilment_Status, so that Customers receive their orders and can follow their progress.

#### Acceptance Criteria

1. WHEN an Admin opens the Orders page of the Admin_Dashboard, THE Admin_Dashboard SHALL list Placed_Orders newest first by placement time, at 20 Placed_Orders per page with page navigation controls, showing for each Placed_Order the Order_Number, placement date and time in India Standard Time (UTC+05:30), the Customer name on the delivery address, the Order_Total formatted by the Price_Formatter, the payment method, the payment status, and the Fulfilment_Status.
2. WHEN an Admin selects a Fulfilment_Status filter ("All" or one of the five Fulfilment_Status values) or a payment status filter ("All", "pending", "paid", or "failed"), THE Admin_Dashboard SHALL list only Placed_Orders matching both selected filters and SHALL reset the page number to 1.
3. WHEN an Admin enters a search term, THE Admin_Dashboard SHALL list only Placed_Orders whose Order_Number equals the trimmed search term compared case-insensitively, or, where the trimmed search term is an Indian_Mobile_Number, whose delivery address mobile number equals the search term, combined with the selected filters, and SHALL reset the page number to 1.
4. IF the trimmed search term matches neither the Order_Number definition nor the Indian_Mobile_Number definition, THEN THE Admin_Dashboard SHALL display the message "Enter an order number or a 10-digit mobile number" and keep the current list unchanged; IF no Placed_Orders match the search and filters, THEN THE Admin_Dashboard SHALL display the message "No orders found".
5. WHEN an Admin opens a Placed_Order from the list, THE Admin_Dashboard SHALL display an order detail page showing each line item's Product name, quantity, MRP, Selling_Price, line total, GST_Rate, and GST_Amount as stored at placement, the delivery address, Subtotal, Coupon code and Coupon_Discount, Shipping_Fee, COD_Fee, total GST_Amount, Order_Total, payment method, payment status, the Fulfilment_Status history with the timestamp of each change, and the Courier_Name and Tracking_Number when stored.
6. THE Storefront SHALL allow only these Fulfilment_Status transitions, one step per request: "Placed" to "Packed", "Packed" to "Shipped", "Shipped" to "Delivered", "Placed" to "Cancelled", and "Packed" to "Cancelled".
7. THE Admin_Dashboard SHALL display on the order detail page only the status update controls for the transitions allowed from the Placed_Order's current Fulfilment_Status, and no status update controls when the Fulfilment_Status is "Delivered" or "Cancelled".
8. IF the server receives a status update request for a transition not listed in criterion 6, including any backward move, any skipped step, and any change from "Delivered" or "Cancelled", THEN THE Storefront SHALL reject the request on the server with HTTP status 409 and the message "This status change is not allowed: [current status] to [requested status]", and leave the Order unchanged.
9. WHEN an Admin requests the transition to "Shipped", THE Admin_Dashboard SHALL require a Tracking_Number and a Courier_Name, each with leading and trailing spaces removed, and IF either value does not match its Glossary definition, THEN THE Storefront SHALL reject the request with the message "Enter a tracking number of 4 to 40 letters, digits, or hyphens" or "Enter a courier name of 2 to 50 characters", respectively, keep the entered values, and leave the Order unchanged.
10. WHEN the Storefront applies the transition to "Shipped", THE Storefront SHALL store the Tracking_Number, the Courier_Name, and the shipped timestamp with the Order in the same operation as the status change.
11. WHEN the Storefront applies any Fulfilment_Status change, THE Storefront SHALL add to the Order's Fulfilment_Status history an entry containing the new Fulfilment_Status, the timestamp of the change, and the user ID of the Admin who made the change.
12. WHEN the Storefront applies the transition to "Delivered" for a COD Order, THE Storefront SHALL set the Order's payment status to "paid" in the same operation.
13. WHEN an Admin selects "Cancel order", THE Admin_Dashboard SHALL display a confirmation dialog, and WHERE the Order is an Online Order with payment status "paid", the dialog and the success message SHALL include the note "Refund ₹X to the customer through Razorpay. Refunds are not issued from the Storefront.", where X is the Order_Total formatted by the Price_Formatter.
14. WHEN an Admin confirms cancellation, THE Storefront SHALL, in one database transaction, set the Fulfilment_Status to "Cancelled", add the history entry in criterion 11, and add each line item's quantity back to the stock quantity of that line item's Product, including an Archived_Product, leaving the payment status unchanged.
15. IF any part of the cancellation transaction fails, THEN THE Storefront SHALL roll back the whole transaction, leaving the Fulfilment_Status, history, and every Product stock quantity unchanged, and THE Admin_Dashboard SHALL display the message "The order could not be cancelled. Try again."
16. IF a status update request asks for the Fulfilment_Status that the Order already has, THEN THE Storefront SHALL make no change, add no history entry, restore no stock, and THE Admin_Dashboard SHALL display the Order with its current Fulfilment_Status.
17. IF a status update request was made from an order detail page loaded when the Order had a different Fulfilment_Status from its current one, and criterion 16 does not apply, THEN THE Storefront SHALL reject the request with the message "This order was updated by someone else. Reload to see the latest status." and leave the Order unchanged.
18. WHILE a status update request is waiting for a server response, THE Admin_Dashboard SHALL disable all status update controls on the order detail page.
19. FOR ALL sequences of status update requests applied to a Placed_Order, THE Storefront SHALL keep the Order's Fulfilment_Status history equal to a prefix of "Placed", "Packed", "Shipped", "Delivered", or to "Placed" or "Placed", "Packed" followed by "Cancelled" (invariant).
20. FOR ALL Placed_Orders and allowed transitions, applying the same status update request twice SHALL leave the Order, its history, and every Product stock quantity equal to applying the request once (idempotence).
21. FOR ALL Placed_Orders that are cancelled, the quantity added back to each Product's stock quantity SHALL equal the quantity of that Product deducted from stock when the Order was placed, added exactly once regardless of the number of cancellation requests (round-trip property).

### Requirement 28: Track My Order

**User Story:** As a Customer, I want to check my order's progress with my order number and mobile number, so that I know when my order will arrive without signing in.

#### Acceptance Criteria

1. THE Storefront SHALL provide a public Track My Order page that any Customer can use without signing in, linked from the header as stated in Requirement 2, criterion 1, and from a "Track My Order" link in the footer on every page.
2. THE Storefront SHALL display on the Track My Order page an Order_Number field that accepts up to 30 characters, a mobile number field with a fixed, non-editable "+91" prefix that accepts only the digits 0–9 and a maximum of 10 characters, and a "Track Order" button.
3. IF the submitted Order_Number, after leading and trailing spaces are removed and letters are converted to uppercase, does not match the Order_Number definition, THEN THE Storefront SHALL display the message "Enter a valid order number", keep the entered values, and send no lookup request.
4. IF the submitted mobile number is not a valid Indian_Mobile_Number, THEN THE Storefront SHALL display the message "Enter a valid 10-digit mobile number", keep the entered values, and send no lookup request.
5. WHEN a Customer submits a valid Order_Number and Indian_Mobile_Number, THE Order_Tracker SHALL report a match only when the trimmed Order_Number, compared case-insensitively, belongs to a Placed_Order and the submitted Indian_Mobile_Number equals the mobile number on that Placed_Order's delivery address, reading the Fulfilment_Status stored at the time of the lookup.
6. WHEN the Order_Tracker reports a match for an Order whose Fulfilment_Status is not "Cancelled", THE Storefront SHALL display the Order_Number, the order date, a progress indicator with the four steps "Placed", "Packed", "Shipped", and "Delivered" with the current Fulfilment_Status step highlighted and the date of each reached step shown, each line item's Product name and quantity, and the Order_Total formatted by the Price_Formatter, with all dates in India Standard Time (UTC+05:30).
7. WHILE a matched Order's Fulfilment_Status is "Shipped" or "Delivered", THE Storefront SHALL display the Order's Courier_Name and Tracking_Number on the tracking result.
8. WHEN the Order_Tracker reports a match for an Order whose Fulfilment_Status is "Cancelled", THE Storefront SHALL display the message "This order was cancelled" in place of the progress indicator, together with the Order_Number, order date, line items, and Order_Total.
9. THE Order_Tracker SHALL return only the fields listed in criteria 6 to 8, with no delivery address, Customer name, email address, payment method, payment status, or payment identifiers in the response.
10. IF the Order_Number matches no Order, matches an Order that is not a Placed_Order, or the mobile number does not equal the delivery address mobile number, THEN THE Storefront SHALL display the message "We couldn't find an order with these details", and THE Order_Tracker SHALL return the same HTTP status and response body in all three cases, so that the response does not reveal whether the Order_Number exists.
11. IF more than 10 lookup requests arrive from the same IP address within a rolling 15-minute window, THEN THE Order_Tracker SHALL perform no lookup for each further request in that window, and THE Storefront SHALL display the message "Too many attempts. Please try again later."
12. WHILE a lookup request is waiting for a response, THE Storefront SHALL disable the "Track Order" button and show a loading indicator on it.
13. IF a lookup fails or returns no response within 10 seconds of submission, THEN THE Storefront SHALL display the message "We couldn't load your order status. Please try again.", keep the entered values, and display a "Retry" button that repeats the lookup with the same values.
14. THE Storefront SHALL display on the order confirmation page shown to an Authenticated_Customer a "Track this order" link that opens the Track My Order page for that Order_Number.
15. WHEN the Authenticated_Customer who placed an Order opens the Track My Order page through the link in criterion 14, THE Order_Tracker SHALL display the tracking result of criteria 6 to 8 for that Order without requiring the mobile number; WHEN any other Customer opens that link, THE Storefront SHALL prefill only the Order_Number field and require the mobile number.
16. FOR ALL Placed_Orders and all submitted pairs of Order_Number and Indian_Mobile_Number, including Order_Numbers that differ only in letter case or leading and trailing spaces, THE Order_Tracker SHALL report a match if and only if the normalised Order_Number equals the Placed_Order's Order_Number and the mobile number equals the delivery address mobile number (model-based property).
17. FOR ALL non-matching lookups described in criterion 10, THE Order_Tracker SHALL return responses that are identical to one another (invariant).
18. FOR ALL Fulfilment_Status values other than "Cancelled", the progress indicator SHALL highlight the step equal to the Fulfilment_Status and show a date for that step and every earlier step, and no date for any later step (invariant).
### Requirement 29: Product Reviews

**User Story:** As a Customer, I want to read and write ratings and reviews from people who received a product, so that I can judge whether the product suits me.

#### Acceptance Criteria

1. WHEN a Customer opens the Product Detail page of an active Product that has at least one Review, THE Review_Service SHALL display next to the Product name the average rating rounded to one decimal place with halves rounded up (for example, "4.3") and the number of Reviews (for example, "12 reviews", using "review" when the number is 1).
2. THE Review_Service SHALL display on the Product Detail page a reviews list ordered by the date each Review was created with the newest first, showing 10 Reviews at a time and a "Load more" button that appends the next 10 Reviews, with the "Load more" button hidden once every Review is displayed.
3. THE Review_Service SHALL display for each Review in the reviews list the star rating as 1 to 5 filled stars with the text alternative "N out of 5 stars", the reviewer's first name (the first word of the reviewer's profile name, or "Customer" when the profile name is empty), the date the Review was created in India Standard Time (UTC+05:30), the review text, and a "Verified Buyer" badge with a gold token fill and bronze or dark text that meets Requirement 1, criteria 8 and 10.
4. IF an active Product has no Reviews, THEN THE Review_Service SHALL display the message "No reviews yet" in place of the reviews list and SHALL display no average rating next to the Product name.
5. WHILE an active Product has at least one Review, THE Storefront SHALL display the Product's average rating, formatted as in criterion 1, and the number of Reviews on every product card for that Product; WHILE the Product has no Reviews, THE Storefront SHALL display no rating on its product cards.
6. WHILE a Guest_Customer views a Product Detail page, THE Storefront SHALL display a "Sign in to write a review" link in place of the review form, leading to the Login page with that Product Detail page recorded as the return destination, as described in Requirement 8, criterion 4.
7. WHILE an Authenticated_Customer who is not a Verified_Buyer of the Product views the Product Detail page, THE Storefront SHALL display the message "Only customers who received this product can review it" and SHALL display no review form.
8. WHILE a Verified_Buyer of the Product who has no Review of that Product views the Product Detail page, THE Review_Service SHALL display a "Write a review" form containing a star rating input with no star preselected and a review text field.
9. THE Review_Service SHALL provide a star rating input that accepts a whole number of stars from 1 to 5, gives each star the accessible label "N stars", and can be operated with the keyboard alone, with the arrow keys changing the selected rating.
10. THE Review_Service SHALL accept review text of 10 to 1,000 characters after leading and trailing spaces are removed, as an exception to the 255-character free-text limit of Requirement 22, criterion 6, and SHALL store the trimmed text.
11. IF a Customer submits the review form with no star rating selected, or with review text shorter than 10 or longer than 1,000 characters after trimming, THEN THE Review_Service SHALL display the message "Select a star rating" or "Review must be 10 to 1,000 characters", respectively, next to the invalid field, keep the entered values, and store no Review data.
12. WHEN the server receives a request to create, edit, or delete a Review, THE Review_Service SHALL check on the server that the requester is a Verified_Buyer of the Product, or is the Admin of criterion 17 for a delete request, before storing any change.
13. IF a requester who is not a Verified_Buyer of the Product sends a request to create or edit a Review, THEN THE Review_Service SHALL return HTTP status 403 with the message "Only customers who received this product can review it" and store no Review data.
14. WHEN a Verified_Buyer submits a valid review form and has no Review of the Product, THE Review_Service SHALL store one Review linked to the Verified_Buyer and the Product and THE Storefront SHALL display the message "Review saved".
15. WHILE a Verified_Buyer already has a Review of the Product, THE Review_Service SHALL display in place of the "Write a review" form an "Edit your review" form prefilled with the stored star rating and review text, and a "Delete review" control.
16. WHEN a Verified_Buyer submits a valid review form while a Review by that Verified_Buyer of the Product already exists, including a submission from a form loaded before the first Review was saved, THE Review_Service SHALL replace the star rating and review text of the existing Review, keep its creation date, and create no additional Review.
17. WHEN a Verified_Buyer selects "Delete review", THE Storefront SHALL display a confirmation dialog, and WHEN the Verified_Buyer confirms, THE Review_Service SHALL delete the Review and display the "Write a review" form again; WHEN the Verified_Buyer cancels, THE Review_Service SHALL leave the Review unchanged.
18. IF a Customer who is not an Admin sends a request to edit or delete a Review that belongs to another Customer, THEN THE Review_Service SHALL return HTTP status 403 and leave the Review unchanged.
19. WHEN an Admin opens the edit page of a Product in the Admin_Dashboard, THE Admin_Dashboard SHALL list the Product's Reviews newest first, each with its star rating, reviewer first name, creation date, review text, and a "Delete" control.
20. WHEN an Admin selects "Delete" for a Review, THE Admin_Dashboard SHALL display a confirmation dialog, and WHEN the Admin confirms, THE Review_Service SHALL permanently delete the Review and THE Admin_Dashboard SHALL display the message "Review deleted"; WHEN the Admin cancels, THE Review_Service SHALL leave the Review unchanged.
21. THE Review_Service SHALL display review text and reviewer names as plain text, showing any HTML tags or script content as literal characters and rendering or executing none of them.
22. WHEN a Review is created, edited, or deleted, THE Storefront SHALL update the average rating, the number of Reviews, and the reviews list shown on the Product Detail page and on product cards for that Product within 60 seconds.
23. WHILE a Product is inactive or is an Archived_Product, THE Review_Service SHALL return none of the Product's Reviews to customer-facing pages and SHALL reject requests to create or edit a Review of that Product with HTTP status 404.
24. IF a request to save or delete a Review fails or returns no response within 10 seconds, THEN THE Storefront SHALL display the message "Your review could not be saved. Try again.", keep the entered values in the form, and leave the stored Review unchanged.
25. FOR ALL Products with at least one Review, the displayed average rating SHALL equal the sum of the Reviews' star ratings divided by the number of Reviews, rounded to one decimal place with halves rounded up, and SHALL lie between 1.0 and 5.0 inclusive (invariant).
26. FOR ALL sequences of create, edit, and delete requests, including concurrent requests, THE Review_Service SHALL hold at most one Review per Customer per Product (invariant).
27. FOR ALL Verified_Buyers and valid review forms, submitting the same review form twice SHALL leave the stored Reviews equal to submitting it once (idempotence).

### Requirement 30: Wishlist

**User Story:** As an Authenticated_Customer, I want to save Products to a wishlist, so that I can find and buy them later.

#### Acceptance Criteria

1. THE Storefront SHALL display a heart button on every product card on the Homepage and the Product Listing page and on the Product Detail page, operable with the keyboard alone.
2. THE Storefront SHALL give the heart button the accessible label "Remove from wishlist" and a pressed state of true while the Product is in the Customer's Wishlist, filled in the gold token colour, and the accessible label "Add to wishlist" and a pressed state of false otherwise, shown as a gold token outline.
3. WHEN an Authenticated_Customer selects the heart button for a Product that is not in the Wishlist, THE Wishlist_Service SHALL add the Product to the Wishlist in Supabase with the date and time it was added, and THE Storefront SHALL show the heart button in the "Remove from wishlist" state and update the header wishlist badge immediately, before the save completes.
4. WHEN an Authenticated_Customer selects the heart button for a Product that is in the Wishlist, THE Wishlist_Service SHALL remove the Product from the Wishlist in Supabase, and THE Storefront SHALL show the heart button in the "Add to wishlist" state and update the header wishlist badge immediately, before the save completes.
5. IF saving a Wishlist add or remove fails or returns no response within 10 seconds, THEN THE Storefront SHALL return the heart button and the header wishlist badge to their state before the selection and display the message "Your wishlist could not be updated. Try again."
6. WHEN a Guest_Customer selects the heart button for a Product, THE Storefront SHALL redirect the Guest_Customer to the Login page with the current page recorded as the return destination, as described in Requirement 8, criterion 4, together with that Product as a pending Wishlist addition.
7. WHEN a Customer completes sign-in with a pending Wishlist addition, THE Wishlist_Service SHALL add that Product to the Wishlist when the Product is active and not already in the Wishlist, and THE Storefront SHALL return the Customer to the recorded page with the heart button shown in the "Remove from wishlist" state.
8. IF the pending Wishlist addition of criterion 7 cannot be made because the Product is no longer active, the Wishlist is full, or the save fails, THEN THE Storefront SHALL still return the Customer to the recorded page and display the message for that case from criterion 5, 13, or the text "This product is no longer available".
9. WHEN an Authenticated_Customer opens the Wishlist page, which is protected as described in Requirement 8, criterion 4, THE Storefront SHALL display a product card for each active Product in the Wishlist, ordered by date added with the most recent first, showing the primary image, name, Selling_Price formatted by the Price_Formatter, the MRP formatted by the Price_Formatter with a strikethrough where the Selling_Price is less than the MRP, an "Add to Cart" button, and a "Remove" control.
10. WHILE a Product on the Wishlist page has a stock quantity of 0, THE Storefront SHALL disable that card's "Add to Cart" button and display the label "Out of Stock" on the card.
11. WHEN an Authenticated_Customer selects "Add to Cart" on the Wishlist page, THE Cart_Service SHALL add the Product to the Cart with quantity 1, applying Requirement 5, criterion 11, when the Max_Item_Quantity is reached, and THE Storefront SHALL keep the Product in the Wishlist and display a confirmation message naming the Product.
12. WHEN an Authenticated_Customer selects "Remove" on the Wishlist page, THE Wishlist_Service SHALL remove the Product from the Wishlist and THE Storefront SHALL remove the card from the page within 1 second, applying criterion 5 when the save fails.
13. IF an Authenticated_Customer tries to add a Product while the Wishlist already holds 100 active Products, THEN THE Wishlist_Service SHALL reject the addition on the server, THE Storefront SHALL keep the heart button in the "Add to wishlist" state, and THE Storefront SHALL display the message "Your wishlist is full (100 items). Remove an item to add another."
14. WHILE the Wishlist contains no active Products, THE Storefront SHALL display on the Wishlist page the message "Your wishlist is empty" and a "Continue Shopping" button that navigates to page 1 of the Product Listing page with no filters applied.
15. WHILE a Product in the Wishlist is inactive or is an Archived_Product, THE Storefront SHALL hide the Product from the Wishlist page and exclude it from the header wishlist badge count and from the limit in criterion 13.
16. WHILE an Authenticated_Customer's Wishlist contains at least one active Product, THE Storefront SHALL display on the header wishlist icon of Requirement 2, criterion 1, a badge showing the number of active Products in the Wishlist, updated within 1 second of any Wishlist change; WHILE the Wishlist contains no active Products, or the Customer is a Guest_Customer, THE Storefront SHALL display the wishlist icon without a badge.
17. FOR ALL Wishlists and Products, selecting the heart button for the same Product twice in succession SHALL return the Wishlist to its original contents (round-trip property).
18. FOR ALL Wishlists and Products already in the Wishlist, an add request for that Product SHALL leave the Wishlist unchanged (idempotence).
19. FOR ALL sequences of add and remove requests, including concurrent requests, THE Wishlist_Service SHALL hold each Product at most once in a Customer's Wishlist (invariant).

### Requirement 31: Admin Coupon Management

**User Story:** As an Admin, I want to create, edit, and retire Coupons, so that Nutraciti can run discount promotions.

#### Acceptance Criteria

1. WHEN an Admin opens the Coupons page of the Admin_Dashboard, THE Admin_Dashboard SHALL list every Coupon with its code, type ("Percent" or "Flat"), value (shown as "N%" for a percent Coupon or formatted by the Price_Formatter for a flat Coupon), minimum order value formatted by the Price_Formatter, expiry date, active flag, and times used, ordered by expiry date ascending with equal expiry dates ordered by code ascending.
2. WHILE a Coupon's expiry date is before the current date in India Standard Time (UTC+05:30), THE Admin_Dashboard SHALL display the label "Expired" on that Coupon in the list.
3. THE Admin_Dashboard SHALL provide an add form and an edit form for Coupons with the fields code, type, value, minimum order value, expiry date, and active flag, where the edit form opens with the Coupon's stored values.
4. THE Admin_Dashboard SHALL accept a code of 3 to 20 characters after leading and trailing spaces are removed, consisting only of the letters A–Z or a–z and the digits 0–9; otherwise THE Admin_Dashboard SHALL display the message "Use 3 to 20 letters or digits".
5. WHEN a Coupon is saved, THE Storefront SHALL store the code converted to uppercase.
6. IF the code equals the code of another Coupon when compared case-insensitively, THEN THE Storefront SHALL reject the save with the message "This code already exists" shown at the code field.
7. THE Admin_Dashboard SHALL require a type of "percent" or "flat"; IF no type is selected, THEN THE Admin_Dashboard SHALL display the message "Select a coupon type".
8. WHERE the type is "percent", THE Admin_Dashboard SHALL accept a value that is a whole number from 1 to 90; otherwise THE Admin_Dashboard SHALL display the message "Enter a whole number from 1 to 90".
9. WHERE the type is "flat", THE Admin_Dashboard SHALL accept a value from ₹1 to ₹1,00,000 with up to 2 decimal places, stored as whole paise equal to the entered rupee amount × 100; otherwise THE Admin_Dashboard SHALL display the message "Enter an amount from ₹1 to ₹1,00,000".
10. THE Admin_Dashboard SHALL accept a minimum order value from ₹0 to ₹1,00,000 with up to 2 decimal places, stored as whole paise equal to the entered rupee amount × 100; otherwise THE Admin_Dashboard SHALL display the message "Enter an amount from ₹0 to ₹1,00,000".
11. WHEN an Admin creates a Coupon or changes the expiry date of an existing Coupon, THE Storefront SHALL accept only an expiry date on or after the current date in India Standard Time, and otherwise SHALL reject the save with the message "Expiry date cannot be in the past".
12. THE Coupon_Service SHALL treat a Coupon as unexpired up to and including 23:59:59 India Standard Time on its expiry date.
13. IF any field fails validation when an Admin saves a Coupon, THEN THE Admin_Dashboard SHALL display an error message next to each invalid field, keep every entered value in the form, and THE Storefront SHALL create or update no Coupon data, applying the same validation on the server.
14. WHEN an Admin saves a Coupon that passes validation, THE Storefront SHALL store all fields and THE Admin_Dashboard SHALL display the message "Coupon saved".
15. WHEN an Admin selects the activate or deactivate control for a Coupon, THE Storefront SHALL set the Coupon's active flag to true or false, respectively, and THE Admin_Dashboard SHALL display the message "Coupon activated" or "Coupon deactivated".
16. WHEN an Admin selects "Delete" for a Coupon, THE Admin_Dashboard SHALL display a confirmation dialog naming the Coupon code, and WHEN the Admin cancels the dialog, THE Storefront SHALL leave the Coupon unchanged.
17. WHEN an Admin confirms deletion of a Coupon that is recorded on at least one Order, checked on the server at deletion time, THE Storefront SHALL set the Coupon's active flag to false and keep its record, and THE Admin_Dashboard SHALL display the message "This coupon has been used in orders, so it was deactivated instead of deleted."
18. WHEN an Admin confirms deletion of a Coupon that is recorded on no Order, THE Storefront SHALL permanently delete the Coupon and THE Admin_Dashboard SHALL display the message "Coupon deleted".
19. WHEN an Admin edits, deactivates, or deletes a Coupon, THE Storefront SHALL leave the Coupon code and Coupon_Discount stored on every existing Order unchanged.
20. FOR ALL sets of Coupons produced by any sequence of add, edit, and delete requests, THE Storefront SHALL hold Coupon codes that are uppercase and unique when compared case-insensitively, percent values that are whole numbers from 1 to 90, flat values from 100 to 1,00,00,000 paise, and minimum order values from 0 to 1,00,00,000 paise, and SHALL reject any save that would break this invariant with the stored Coupon left unchanged (invariant).

### Requirement 32: Applying a Coupon

**User Story:** As a Customer, I want to apply a coupon code to my cart, so that I pay less for my order.

#### Acceptance Criteria

1. WHILE no Coupon is applied to the Cart, THE Storefront SHALL display on the Cart page and in the Checkout order summary a coupon code input and an "Apply" button.
2. IF a Customer selects "Apply" while the coupon code input is empty or contains only spaces, THEN THE Storefront SHALL display the message "Enter a coupon code" and send no validation request.
3. WHEN a Customer selects "Apply" with a non-empty coupon code, THE Storefront SHALL send the code to the Coupon_Service for validation under Requirement 33, with the code compared after leading and trailing spaces are removed and case-insensitively, and SHALL disable the "Apply" button and show a loading indicator on it until the Coupon_Service responds or 10 seconds elapse.
4. WHEN the Coupon_Service reports a Coupon as valid, THE Cart_Service SHALL apply the Coupon to the Cart, and THE Storefront SHALL display the message "Coupon CODE applied — you save ₹X" and a "Coupon (CODE)" line showing "−₹X" in the order summary, where CODE is the stored uppercase code and X is the Coupon_Discount formatted by the Price_Formatter, and SHALL update all totals within 1 second.
5. WHILE a Coupon is applied to the Cart, THE Storefront SHALL display the applied code with a "Remove" control in place of the coupon code input, so that at most one Coupon is applied to a Cart at a time.
6. WHEN a Customer selects "Remove" for the applied Coupon, THE Cart_Service SHALL remove the Coupon from the Cart, and THE Storefront SHALL hide the Coupon line, set the Coupon_Discount to zero, display the coupon code input again, and update all totals within 1 second.
7. IF the Coupon_Service reports a Coupon as not valid, THEN THE Storefront SHALL keep the entered code in the input, apply no Coupon, and display the message for the first failed check of Requirement 33, criterion 1: "This coupon code is not valid" when no Coupon has the code, "This coupon is no longer available" when the Coupon is inactive, "This coupon has expired" when the Coupon is past its expiry, or "Add ₹X more to use this coupon" when the Subtotal is below the minimum order value, where X is the minimum order value minus the Subtotal formatted by the Price_Formatter.
8. THE Cart_Service SHALL store the applied Coupon code with the Cart, in local storage for a Guest_Customer and in Supabase for an Authenticated_Customer as described in Requirement 10, and WHEN a guest Cart is merged at sign-in, THE Cart_Service SHALL keep the guest Cart's applied Coupon if it has one, and otherwise the Supabase Cart's applied Coupon.
9. WHEN a Cart_Item is added, updated, or removed, the Cart is merged, or the Cart page or Checkout page loads while a Coupon is applied, THE Coupon_Service SHALL re-validate the Coupon and recompute the Coupon_Discount for the current Cart within 1 second.
10. IF the re-validation in criterion 9 finds the Coupon not valid, THEN THE Cart_Service SHALL remove the Coupon from the Cart, and THE Storefront SHALL display the reason message from criterion 7 and the recalculated totals.
11. THE Storefront SHALL keep the "You saved ₹X" message of Requirement 12 equal to the MRP-based Cart savings, excluding the Coupon_Discount, and SHALL show the Coupon_Discount only in the Coupon line and the message of criterion 4.
12. IF more than 10 apply requests arrive from the same Authenticated_Customer account, or from the same IP address, within a rolling 15-minute window, THEN THE Coupon_Service SHALL perform no validation for each further request in that window, and THE Storefront SHALL display the message "Too many attempts. Please try again later."
13. IF a validation request fails or returns no response within 10 seconds, THEN THE Storefront SHALL display the message "We couldn't check this coupon. Please try again.", keep the entered code, apply no Coupon, and re-enable the "Apply" button.
14. FOR ALL Carts and valid Coupons, applying the Coupon and then removing the Coupon SHALL return the Subtotal, Coupon_Discount, Shipping_Fee, COD_Fee, Order_Total, and GST breakdown to their values before the Coupon was applied (round-trip property).

### Requirement 33: Coupon Validation and Discount Calculation

**User Story:** As Nutraciti International, I want every Coupon checked and every discount calculated on the server, so that customers receive only the discounts they are entitled to.

#### Acceptance Criteria

1. WHEN the Coupon_Service validates a code, THE Coupon_Service SHALL, on the server, normalise the code by removing leading and trailing spaces and converting letters to uppercase, and SHALL report the Coupon as valid only when all of these checks pass, in this order: a Coupon with the normalised code exists; the Coupon's active flag is true; the current date in India Standard Time is on or before the Coupon's expiry date; and the Subtotal is greater than or equal to the Coupon's minimum order value.
2. THE Coupon_Service SHALL compute the Subtotal used for validation and for the Coupon_Discount on the server from the Product_Catalog's current Selling_Prices and the Cart_Item quantities, ignoring any price, discount, or total supplied by the browser.
3. WHERE the Coupon type is "percent", THE Coupon_Service SHALL compute the Coupon_Discount as floor(Subtotal × value ÷ 100) in whole paise (for example, a Subtotal of 99,999 paise with a 10% Coupon gives a Coupon_Discount of 9,999 paise).
4. WHERE the Coupon type is "flat", THE Coupon_Service SHALL compute the Coupon_Discount as the Coupon's value in paise.
5. THE Coupon_Service SHALL cap the Coupon_Discount at the Subtotal, so that the Coupon_Discount equals the lesser of the amount from criterion 3 or 4 and the Subtotal.
6. WHEN a Customer places an Order with a Coupon applied, THE Checkout_Service SHALL re-validate the Coupon under criterion 1 and recompute the Coupon_Discount under criteria 2 to 5 from the server prices at the time of placement.
7. IF the re-validation in criterion 6 finds the Coupon not valid, THEN THE Checkout_Service SHALL create no Order and start no payment, THE Cart_Service SHALL remove the Coupon from the Cart, and THE Storefront SHALL keep the entered delivery address and selected payment method, display the reason message from Requirement 32, criterion 7, and show the order summary with totals recalculated without the Coupon.
8. WHEN the Checkout_Service creates an Order with a valid Coupon, THE Checkout_Service SHALL store the normalised Coupon code and the server-computed Coupon_Discount on the Order.
9. WHEN an Order with a Coupon becomes a Placed_Order, THE Storefront SHALL increase the Coupon's times used by exactly 1 in the same operation, SHALL NOT count an Online Order whose payment status is "pending" or "failed", and SHALL leave the times used unchanged when the Order is later cancelled.
10. THE Checkout_Service SHALL compare the Free_Shipping_Threshold with the Discounted_Subtotal and the COD_Limit with the Order_Total including the COD_Fee and after the Coupon_Discount.
11. WHEN the Checkout_Service creates a Razorpay order for an Online Order, THE Checkout_Service SHALL set the Razorpay order amount equal to the Order's server-computed Order_Total, after the Coupon_Discount, in paise.
12. FOR ALL Carts and Coupons, the Coupon_Discount SHALL be a whole number of paise with 0 ≤ Coupon_Discount ≤ Subtotal (invariant).
13. FOR ALL Carts, Coupons, and payment methods, the Order_Total SHALL be greater than or equal to zero and SHALL satisfy the identity of Requirement 15, criterion 6 (invariant).
14. FOR ALL code strings x, normalising the normalised code SHALL equal normalising once, so that uppercase(trim(uppercase(trim(x)))) equals uppercase(trim(x)) (idempotence).
15. FOR ALL Subtotals and Coupons, computing the Coupon_Discount twice with the same Subtotal and the same Coupon SHALL produce the same Coupon_Discount (determinism invariant).

### Requirement 34: GST Breakdown

**User Story:** As a Customer in India, I want to see how much GST is included in my order, so that I know the tax I am paying.

#### Acceptance Criteria

1. WHEN the GST_Calculator computes GST for a Cart or Order, THE GST_Calculator SHALL compute each line item's line total as Selling_Price × quantity in whole paise.
2. WHEN a Coupon_Discount greater than zero applies, THE GST_Calculator SHALL compute each line item's Line_Discount_Share as floor(Coupon_Discount × line total ÷ Subtotal) in whole paise, then assign the remaining paise (Coupon_Discount minus the sum of these shares) one paise at a time to the line items in order of line total from largest to smallest, with equal line totals ordered by Product identifier ascending, until the shares sum exactly to the Coupon_Discount.
3. WHILE no Coupon is applied, THE GST_Calculator SHALL set every Line_Discount_Share to zero.
4. THE GST_Calculator SHALL compute each line item's GST_Amount using the formula in the GST_Amount Glossary definition, rounded to the nearest whole paise with halves rounded up, and the GST_Amount of the Cart or Order as the sum of its line items' GST_Amounts (for example, a line total of ₹708 at a GST_Rate of 18 with no Coupon gives 70,800 × 18 ÷ 118 = 10,800 paise, a GST_Amount of ₹108).
5. WHILE every line item has the same GST_Rate and the total GST_Amount is greater than zero, THE Storefront SHALL display below the Order_Total in the Checkout order summary the line "Includes X% GST: ₹Y", where X is the GST_Rate and Y is the total GST_Amount formatted by the Price_Formatter (for example, "Includes 18% GST: ₹108").
6. WHILE the line items have two or more different GST_Rates and the total GST_Amount is greater than zero, THE Storefront SHALL display below the Order_Total the line "Includes GST: ₹Y", followed by one line "GST @ X%: ₹Z" for each GST_Rate in ascending order whose summed GST_Amount Z is greater than zero, with every amount formatted by the Price_Formatter.
7. WHILE the total GST_Amount is zero, THE Storefront SHALL hide the GST breakdown.
8. WHEN the Checkout_Service creates an Order, THE Checkout_Service SHALL compute on the server, and store with each line item, the GST_Rate, Line_Discount_Share, and GST_Amount, and SHALL store the Order's total GST_Amount.
9. THE Storefront SHALL display the GST breakdown of criteria 5 to 7 on the order confirmation page and the Admin_Dashboard order detail page using the GST_Rates, Line_Discount_Shares, and GST_Amounts stored on the Order, unchanged by any later change to a Product's GST_Rate or Selling_Price.
10. FOR ALL Carts and Coupons, the GST breakdown shown in the Checkout order summary SHALL equal the GST values stored on the Order created from that Cart and Coupon when the Selling_Prices and GST_Rates are unchanged between display and placement (model-based property).
11. THE GST_Calculator SHALL compute GST only on product line items, and THE Storefront SHALL show no GST for the Shipping_Fee or the COD_Fee.
12. FOR ALL Carts and Coupons, the Line_Discount_Shares SHALL be whole paise that sum exactly to the Coupon_Discount, and each Line_Discount_Share SHALL be greater than or equal to zero and less than or equal to its line total (invariant).
13. FOR ALL line items, the GST_Amount SHALL satisfy 0 ≤ GST_Amount ≤ line total − Line_Discount_Share (invariant).
14. FOR ALL Placed_Orders, recomputing each line item's GST_Amount from the stored line total, Line_Discount_Share, and GST_Rate SHALL reproduce the stored GST_Amount, and summing them SHALL reproduce the stored total GST_Amount (round-trip property).
15. FOR ALL line items with a GST_Rate of 0, the GST_Amount SHALL be 0 (invariant).
