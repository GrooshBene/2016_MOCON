# 2017_MOCON
두부딱

==========

##Database Schema
-------------------

###User Schema

> _id : String, 사용자의 고유 식별번호입니다. 페이스북 auth를 사용할 경우 페이스북 고유 식별번호로 초기화됩니다.

> name : String, 사용자의 이름입니다.
> address : String, 사용자의 집주소입니다.
> bucket : String, 사용자가 장바구니를 생성했을때 장바구니에 해당되는 고유식별번호입니다.
> purchase_history : Array, 사용자의 구매기록입니다. BucketSchema의 id값로 이루어진 배열입니다.
> payment_info : Object, 사용자의 결제수단 정보입니다.
> location : Object, 사용자의 위치정보입니다.


###Bucket Schema

> _id : String, 장바구니의 고유 식별번호입니다.
> user : String, 장바구니가 귀속된 유저의 고유 식별번호입니다.
> content : Array, 장바구니의 내용물입니다. GoodsSchema의 id값으로 이루어져있습니다.

###Goods Schema

> _id : String 상품의 고유 식별번호입니다.
> name : String 상품의 이름입니다.
> thumbnail : String 상품의 썸네일 url경로입니다.
> description : String 상품의 설명입니다.
> price : Number 상품의 가격입니다.

### Truck Schema

> _id : String 트럭의 고유 식별번호입니다.
> name : String 트럭의 이름입니다
> goods_type : String 상품의 종류입니다
> inapp_purchase : 인앱결제 가능 여부입니다. Number 0 1
> credit_purchase : 신용카드 결제 가능 여부입니다. Number 0 1
> goods : 판매하는 상품 목록입니다. Goods Schema의 id값으로 이루어진 배열입니다. Array
> location : 위치정보입니다. Object

##API Docs
--------------

* /auth/facebook/token : 페이스북 로그인을 완료했을 시, 서버에 토큰을 보내 유효 판별 체크 후 데이터베이스에 적재합니다.

>리퀘스트 파라미터

>>access_token : 페이스북 인증 토큰입니다. Facebook SDK의 로그인 버튼을 통해 추출해낼 수 있습니다.

>응답

>> fb user data json


* /bucket/add : 장바구니를 생성합니다.

>리퀘스트 파라미터

>> user_id : 장바구니를 귀속시킬 유저의 아이디값입니다.

>응답

>> Created Bucket Object

* /bucket/update : 장바구니의 내용을 업데이트합니다.

>리퀘스트 파라미터

>> bucket_id : 장바구니의 아이디입니다.
>> content : 업데이트할 내용물의 배열입니다.

>응답

>> Updated Bucket Object

* /bucket/info : 장바구니의 현재 상태를 조회합니다.

>리퀘스트 파라미터

>> bucket_id : 장바구니의 아이디입니다.

>>응답

>> Searched Bucket Object

* /bucket/destroy : 장바구니를 삭제합니다.

>리퀘스트 파라미터

>> bucket_id : 장바구니의 아이디값입니다.

>응답

>> Updated Bucket Object

* /gps/track : GPS트래킹 소켓에 연결합니다.

>리퀘스트 파라미터

>> id : 트럭의 아이디값입니다.

>> user_id : 유저의 아이디값입니다.

>> truck_location(Socket Name) : 트럭의 현재 위치 정보를 실시간으로 보내고, 유저의 위치정보를 받아오는 소켓입니다.

>> user_location(Socket Name) : 유저의 현재 위치정보를 실시간으로 보내고, 트럭의 위치정보를 받아오는 소켓입니다.

>응답

>> 상단기재

* /truck/add/goods : 트럭에 상품을 추가합니다.

>리퀘스트 파라미터

>> name : 상품의 이름입니다.
>> truck_id : 트럭의 아이디값입니다.
>> description : 상품의 설명입니다.
>> price : 상품의 가격입니다.

>응답

>> Updated Truck Object

* /truck/add : 새로운 트럭을 생성합니다.

>리퀘스트 파라미터

>> name : 트럭의 이름입니다.
>> type : 트럭에서 판매하는 상품의 종류입니다.
>> inapp_purchase : 인앱결제 지원여부입니다.
>> credit_purchase : 신용카드 결제 가능 여부 입니다.

>응답

>> Created Truck Object

* /truck/goods : 트럭에서 판매하는 상품을 조회합니다.

>리퀘스트 파라미터

>> id : 트럭의 아이디값입니다.

>응답

>> Truck Goods Array