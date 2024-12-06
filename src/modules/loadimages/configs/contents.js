export default {
    min_free_disk_space: app.get('min_free_disk_space'),
    min_clean_disk_space: app.get('min_clean_disk_space'),
    max_clean_disk_space: app.get('max_clean_disk_space'),
    min_clean_media_items: app.get('min_clean_media_items'),
    max_clean_media_items: app.get('max_clean_media_items'),
    
    cache_min_free_disk_space: app.get('cache_min_free_disk_space'),
    cache_min_clean_disk_space: app.get('cache_min_clean_disk_space'),
    cache_max_clean_disk_space: app.get('cache_max_clean_disk_space'),
    cache_min_clean_items: app.get('cache_min_clean_items'),
    cache_max_clean_items: app.get('cache_max_clean_items'),
};