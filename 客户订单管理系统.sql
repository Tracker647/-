drop database if exists COMS;
create database COMS;
use COMS;

drop table if exists 客户;
create table 客户(
                   客户号     varchar(20),
                   客户姓名   varchar(20),
                   电话      int,
                   地址      varchar(100),
                   primary key (客户号)
);

insert into 客户 values('c10001','张山','153267538','雁塔区太平街10号');
insert into 客户 values('c10002','李思','135996038','雁塔区太平街11号');
insert into 客户 values('c10003','王舞','157223080','猴山区石头街7号');
insert into 客户 values('c10004','白轩','151338064','花石区五道街3号');
insert into 客户 values('c10005','吴平','147712138','曹泽区恩来街9号');
insert into 客户 values('c10006','蔡谈','133522099','南山区和平街15号');

drop table if exists 工作人员;
create table 工作人员(
                     工号 varchar(20),
                     工作人名 varchar(20),
                     primary key (工号)
);
insert into 工作人员 values('e30001','白恩');
insert into 工作人员 values('e30002','楼缓');
insert into 工作人员 values('e30003','召信');

drop table if exists 服务;
create table 服务(
                   工号 varchar(20),
                   客户号 varchar(20),
                   foreign key (工号) references 工作人员(工号),
                   foreign key (客户号) references 客户(客户号)
);

insert into 服务 values('e30002','c10001');
insert into 服务 values('e30002','c10002');
insert into 服务 values('e30001','c10003');
insert into 服务 values('e30001','c10004');
insert into 服务 values('e30003','c10005');
insert into 服务 values('e30003','c10006');

drop table if exists 商品;
create table 商品(
                   商品号 varchar(20),
                   商品名 varchar(20),
                   商品单价 double,
                   商品库存 int,
                   primary key(商品号)
);

insert into 商品 values('p40005','Java程序设计',30,100);
insert into 商品 values('p40006','计算机组成原理',30,90);
insert into 商品 values('p40007','数据库系统概论',20,95);
insert into 商品 values('p40008','单片机系统设计',10,50);
insert into 商品 values('p40009','经济学原理',40,150);
insert into 商品 values('p40010','算法导论',50,120);


drop table if exists 订单;
create table 订单(
                   订单号 varchar(20),
                   开单日期 date,
                   primary key(订单号)
);

insert into 订单 values('o60001','2021-6-30');
insert into 订单 values('o60002','2021-6-29');
insert into 订单 values('o60003','2021-6-28');
insert into 订单 values('o60004','2021-6-25');
insert into 订单 values('o60005','2021-6-27');
insert into 订单 values('o60006','2021-6-30');

drop table if exists 发票;
create table 发票(
                   发票号 varchar(20),
                   开单日期 date,
                   支付方式 varchar(20),
                   primary key (发票号)
);

insert into 发票 values('t50001','2021-6-30','微信');
insert into 发票 values('t50002','2021-6-28','微信');
insert into 发票 values('t50003','2021-6-29','微信');
insert into 发票 values('t50004','2021-6-27','微信');

drop table if exists 服务;
create table 服务(
                   工号 varchar(20),
                   客户号 varchar(20),
                   primary key (客户号),
                   foreign key (工号) references 工作人员(工号),
                   foreign key (客户号) references 客户(客户号)
);

insert into 服务 values('e30001','c10001');
insert into 服务 values('e30001','c10002');
insert into 服务 values('e30002','c10003');
insert into 服务 values('e30002','c10004');
insert into 服务 values('e30003','c10005');
insert into 服务 values('e30003','c10006');

drop table if exists 客户订单;
create table 客户订单(
                     客户号 varchar(20),
                     订单号 varchar(20),
                     primary key (订单号),
                     foreign key (客户号) references 客户(客户号),
                     foreign key (订单号) references 订单(订单号)
);

insert into 客户订单 values ('c10001','o60001');
insert into 客户订单 values ('c10001','o60002');
insert into 客户订单 values ('c10001','o60003');
insert into 客户订单 values ('c10002','o60004');
insert into 客户订单 values ('c10002','o60005');
insert into 客户订单 values ('c10003','o60006');

drop table if exists 订单包含;
create table 订单包含(
                     订单包含_id int auto_increment,
                     订单号 varchar(20),
                     商品号 varchar(20),
                     订购数量 int,
                     应付金额 double,
                     primary key (订单包含_id,订单号,商品号),
                     foreign key (订单号) references 订单(订单号),
                     foreign key (商品号) references 商品(商品号)

);

insert into 订单包含(订单号,商品号,订购数量) values('o60001','p40005',10);
insert into 订单包含(订单号,商品号,订购数量) values('o60001','p40006',5);
insert into 订单包含(订单号,商品号,订购数量) values('o60002','p40005',9);
insert into 订单包含(订单号,商品号,订购数量) values('o60002','p40006',10);
insert into 订单包含(订单号,商品号,订购数量) values('o60002','p40007',5);
insert into 订单包含(订单号,商品号,订购数量) values('o60001','p40010',9);

drop procedure if exists 应付金额计算;
create procedure 应付金额计算()
begin
    declare 单价 double;
    declare 订购数 int;
    declare 总金额 double;

    declare i int default 1;
    declare 订单包含_len int default 0;

    declare FOUND bool default true;
    declare priceCur cursor for select 商品单价,订购数量 from 订单包含 natural join 商品;
    declare continue handler for not found set FOUND = false;

    open priceCur;
    select count(*) from 订单包含 into 订单包含_len;
    fetch priceCur into 单价,订购数;
    while(FOUND && i <= 订单包含_len) do
            set 总金额 = 单价 * 订购数;
            update 订单包含 set 应付金额 = 总金额 where 订单包含_id = i;
            fetch priceCur into 单价,订购数;
            set i = i + 1;
        end while;
    close priceCur;
end;
call 应付金额计算();

drop table if exists 支付;
create table 支付(
                   支付_id int auto_increment,
                   订单号 varchar(20),
                   发票号 varchar(20),
                   合计金额 double,
                   primary key (支付_id,订单号,发票号),
                   foreign key (发票号) references 发票(发票号)
);

insert into 支付(订单号,发票号) values ('o60001','t50001');
insert into 支付(订单号,发票号) values ('o60002','t50002');
insert into 支付(订单号,发票号) values ('o60003','t50003');


create view 支付view as select 订单号,发票号,sum(应付金额) 总金额 from
    支付 natural join 订单包含 group by 发票号;

# drop procedure if exists 合计金额计算;
# create procedure 合计金额计算()
# begin
#     declare totalCost double;
#
#     declare i int default 1;
#     declare 支付_len int default 0;
#
#     declare FOUND bool;
#     declare costCur cursor for select sum(应付金额) 总金额 from
#         支付 natural join 订单包含 group by 发票号;
#     declare continue handler for not found set FOUND = false;
#
#     open costCur;
#     select count(*) from 支付 into 支付_len;
#     while(FOUND && i <= 支付_len ) do
#         fetch costCur into totalCost;
#         select totalCost;
#         update 支付 set 合计金额 = totalCost where 支付_id = i;
#         set i = i + 1;
#     end while;
# end;
# call 合计金额计算();

