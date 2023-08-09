
# Docker常用命令
## Docker启动类命令
```
docker version # 显示docker的版本信息
docker info    # 显示docker的系统信息
docker 命令 --help # 查看docker命令帮助文档
```

## 镜像命令
### 查看镜像
```
docker images # 列出本地主机上的镜像
docker images -a # 列出本地所有的镜像
docker images -q # 只显示镜像ID

docker system df # 查看镜像/容器/数据卷所占的空间
```

### 搜索镜像
```
docker search 镜像名 # 在仓库中查找镜像
docker search --limit 个数 镜像名 # limit是限制查找个数，默认是25
```

### 下载镜像
```
docker pull  镜像名[:tag] # tag是版本号，没填就是默认版
```

### 删除镜像

```
docker rmi 镜像ID
```

## 容器命令
### 启动容器
```
docker run [OPTIONS] IMAGE [COMMAND][ARG...]
```
**OPTIONS**
- --name="容器新名称": 为容器指定一个名称
- -d：后台运行容器并返回容器ID，也即启动守护容器（后台运行）；
- -i：以交互模式运行容器，通常与-t同时使用；
- -t：为容器重新分配一个伪输入终端，通常与-i同时使用。
- -P：随机端口映射，大写P
- -p：指定端口映射，小写p

**例子**
我们运行一个Ubuntu的系统
```
docker run -it ubuntu /bin/bash
```
参数解释：
- -it就是等于-i -t；
- /bin/bash：是指载入容器后执行的命令