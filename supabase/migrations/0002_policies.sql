-- RLS policies and Storage bucket
drop policy if exists profiles_select_own on public.profiles;
create policy profiles_select_own on public.profiles for select using (auth.uid() = id or public.is_admin());
drop policy if exists profiles_update_own on public.profiles;
create policy profiles_update_own on public.profiles for update using (auth.uid() = id) with check (auth.uid() = id);

drop policy if exists categories_public_read on public.categories;
create policy categories_public_read on public.categories for select using (true);
drop policy if exists categories_admin_write on public.categories;
create policy categories_admin_write on public.categories for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists products_public_read on public.products;
create policy products_public_read on public.products for select using (active and not archived);
drop policy if exists products_admin_all on public.products;
create policy products_admin_all on public.products for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists product_images_public_read on public.product_images;
create policy product_images_public_read on public.product_images for select using (true);
drop policy if exists product_images_admin_write on public.product_images;
create policy product_images_admin_write on public.product_images for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists store_settings_public_read on public.store_settings;
create policy store_settings_public_read on public.store_settings for select using (true);
drop policy if exists store_settings_admin_write on public.store_settings;
create policy store_settings_admin_write on public.store_settings for all using (public.is_admin()) with check (public.is_admin());

insert into storage.buckets (id, name, public) values ('product-images', 'product-images', true) on conflict (id) do nothing;
drop policy if exists product_images_storage_read on storage.objects;
create policy product_images_storage_read on storage.objects for select using (bucket_id = 'product-images');
drop policy if exists product_images_storage_admin_ins on storage.objects;
create policy product_images_storage_admin_ins on storage.objects for insert with check (bucket_id = 'product-images' and public.is_admin());
drop policy if exists product_images_storage_admin_upd on storage.objects;
create policy product_images_storage_admin_upd on storage.objects for update using (bucket_id = 'product-images' and public.is_admin());
drop policy if exists product_images_storage_admin_del on storage.objects;
create policy product_images_storage_admin_del on storage.objects for delete using (bucket_id = 'product-images' and public.is_admin());
