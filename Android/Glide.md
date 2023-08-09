# Glide
**导入**

Glide要同时导入两个包
```java 
  implementation 'com.github.bumptech.glide:glide:4.13.0'
  annotationProcessor 'com.github.bumptech.glide:compiler:4.13.0'
```
Glide的with方法不光接受Context，还接受Activity 和 Fragment，Context会自动的从他们获取。

**基本使用：**
 - **with**：需要传入有一个上下文。
 - **load**：需要加载的图片地址，可以是`http`，也可以是`R.id`，常用的图片加载地址都支持。
 - **into**：放入的容器。

### 1.网络加载图片到ImageView中
```java
Glide.with(context).load(imageUrl).into(imageView);
```
### 2.当加载网络图片时，由于加载过程中图片未能及时显示，此时可能需要设置等待时的图片，通过placeHolder()方法
```java
Glide.with(context).load(imageUrl).placeholder(R.mipmap.ic_launcher).into(imageView);
```


### 3.当加载图片失败时，通过error(Drawable drawable)方法设置加载失败后的图片显示：
```java
Glide.with(context).load(imageUrl).error(R.mipmap.ic_launcher).into(imageView);
```
### 4.图片的缩放，centerCrop()和fitCenter()：

(1)使用centerCrop是利用图片图填充ImageView设置的大小，如果ImageView的Height是match_parent则图片就会被拉伸填充
```java
Glide.with(context).load(imageUrl).centerCrop().into(imageView);
```
(2)使用fitCenter即缩放图像让图像都测量出来等于或小于 ImageView 的边界范围,该图像将会完全显示，但可能不会填满整个ImageView。

Glide.with(context).load(imageUrl).fitCenter().into(imageView);

### 5.显示gif动画,asGif()判断是否是gif动画
```java
Glide.with(context).load(imageUrl).asGif().into(imageView);
```
### 6.显示本地视频
```java
//本地视频
String filePath = "/storage/emulated/0/Pictures/example.mp4";
Glide.with( context ).load( Uri.fromFile( new File( filePath ) ) ).into(imageViewGifAsBitmap );

//本地图片
  
 String filePath = "yourfliename";
 File file = new File(filePath, "ad.jpg");
 //加载图片
                                Glide.with(mContext).load(file).into(ivCircle);
```
### 7.缓存策略
```java
Glide.with( context ).load(imageUrl).skipMemoryCache(true).into(imageViewInternet );//跳过内存缓存

Glide.with( context ).load(imageUrl).diskCacheStrategy(DiskCacheStrategy.NONE).into( imageViewInternet );//跳过硬盘缓存
```
>DiskCacheStrategy.NONE 什么都不缓存
DiskCacheStrategy.SOURCE 仅仅只缓存原来的全分辨率的图像
DiskCacheStrategy.RESULT 仅仅缓存最终的图像，即降低分辨率后的（或者是转换后的）
DiskCacheStrategy.ALL 缓存所有版本的图像（默认行为）

### 8.优先级，设置图片加载的顺序：
```java
Glide.with(context).load(imageUrl).priority( Priority.HIGH).into( imageView);
```
### 9.获取Bitmap，设置CircleImageVIew可以使用这个ImageView库

复制代码
```java
Glide.with(mContext)
    .load(url) 
    .placeholder(R.drawable.loading_spinner)
    .into(new SimpleTarget<Bitmap>(width, height) {
        @Override 
        public void onResourceReady(Bitmap bitmap, GlideAnimation anim) {
            // setImageBitmap(bitmap) on CircleImageView 
        } 
    };
```
### 10.加载圆形图片和圆角图片
```java
//圆形图片
public class GlideCircleTransform extends BitmapTransformation {
    public GlideCircleTransform(Context context) {
        super(context);
    }

    @Override protected Bitmap transform(BitmapPool pool, Bitmap toTransform, int outWidth, int outHeight) {
        return circleCrop(pool, toTransform);
    }

    private static Bitmap circleCrop(BitmapPool pool, Bitmap source) {
        if (source == null) return null;

        int size = Math.min(source.getWidth(), source.getHeight());
        int x = (source.getWidth() - size) / 2;
        int y = (source.getHeight() - size) / 2;

        // TODO this could be acquired from the pool too
        Bitmap squared = Bitmap.createBitmap(source, x, y, size, size);

        Bitmap result = pool.get(size, size, Bitmap.Config.ARGB_8888);
        if (result == null) {
            result = Bitmap.createBitmap(size, size, Bitmap.Config.ARGB_8888);
        }

        Canvas canvas = new Canvas(result);
        Paint paint = new Paint();
        paint.setShader(new BitmapShader(squared, BitmapShader.TileMode.CLAMP, BitmapShader.TileMode.CLAMP));
        paint.setAntiAlias(true);
        float r = size / 2f;
        canvas.drawCircle(r, r, r, paint);
        return result;
    }

    @Override public String getId() {
        return getClass().getName();
    }
}

    Contact GitHub API Training Shop Blog About 

//圆角图片
public class GlideRoundTransform extends BitmapTransformation {

    private static float radius = 0f;

    public GlideRoundTransform(Context context) {
        this(context, 4);
    }

    public GlideRoundTransform(Context context, int dp) {
        super(context);
        this.radius = Resources.getSystem().getDisplayMetrics().density * dp;
    }

    @Override protected Bitmap transform(BitmapPool pool, Bitmap toTransform, int outWidth, int outHeight) {
        return roundCrop(pool, toTransform);
    }

    private static Bitmap roundCrop(BitmapPool pool, Bitmap source) {
        if (source == null) return null;

        Bitmap result = pool.get(source.getWidth(), source.getHeight(), Bitmap.Config.ARGB_8888);
        if (result == null) {
            result = Bitmap.createBitmap(source.getWidth(), source.getHeight(), Bitmap.Config.ARGB_8888);
        }

        Canvas canvas = new Canvas(result);
        Paint paint = new Paint();
        paint.setShader(new BitmapShader(source, BitmapShader.TileMode.CLAMP, BitmapShader.TileMode.CLAMP));
        paint.setAntiAlias(true);
        RectF rectF = new RectF(0f, 0f, source.getWidth(), source.getHeight());
        canvas.drawRoundRect(rectF, radius, radius, paint);
        return result;
    }

    @Override public String getId() {
        return getClass().getName() + Math.round(radius);
    }
}
```

分享一些我的使用技巧

> 1.Glide.with(context).resumeRequests()和 Glide.with(context).pauseRequests()

当列表在滑动的时候，调用pauseRequests()取消请求，滑动停止时，调用resumeRequests()恢复请求。这样是不是会好些呢？

> 2.Glide.clear()