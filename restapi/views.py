from rest_framework import viewsets
from rest_framework.response import Response
from restapi.serializers import serializers
from account.models import Worker, Employer
from rest_framework.permissions import AllowAny


class WorkerViewSet(viewsets.ModelViewSet):
    queryset = Worker.objects.all()
    serializer_class = serializers.WorkerSZ


class EmployerViewSet(viewsets.ModelViewSet):
    queryset = Employer.objects.all()
    serializer_class = serializers.EmployerSZ


# class ProductImagesViewSet(viewsets.ModelViewSet):
#     queryset = ProductImage.objects.all()
#     serializer_class = flatserializers.ProductImageObj


# class CartItemViewSet(viewsets.ModelViewSet):
#     permission_classes = (AllowAny,)
#     queryset = CartItem.objects.all()
#     serializer_class = flatserializers.CartItemObj
#
#     def create(self, request):
#         data = request.data
#         # cartitem = CartItem.objects.get(product_id=data['product'])
#         # cartitem.count = data.count
#         # cartitem.save()
#         try:
#             cartitem = CartItem.objects.get(
#                 product_id=data['product'],
#                 property_id=data['property'],
#                 cart_id=data['cart_id']
#             )
#             cartitem.count = data['count']
#             cartitem.save()
#             data['id'] = cartitem.id
#         except Exception:
#             product = Product.objects.get(id=data['product'])
#             print '-*-*-*-*-*-*-*-*-*-'
#             print data['property']
#             try:
#                 property = PropertyValue.objects.get(id=data['property'])
#                 cartitem = CartItem(product=product, property=property, count=data['count'], cart_id=data['cart_id'])
#             except Exception:
#                 cartitem = CartItem(product=product, count=data['count'], cart_id=data['cart_id'])
#             cartitem.save()
#             data['id'] = cartitem.id
#         return Response({'data': data})
