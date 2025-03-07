import { Form, Input, Modal ,InputNumber,Button,Upload} from 'antd'
import { useDispatch,useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { coverPrice, removeChar } from '@common/utils/method.util'
import { PlusOutlined,InboxOutlined } from '@ant-design/icons'
import { AiOutlineMinusCircle } from 'react-icons/ai'
import { updateProduct } from '@redux/products/products.thunk'
import { selectProductSelected } from '@redux/products/products.slice'
export function ProductUpdateModal({ title, visible, onCancel,okText="Ok",cancelText="Hủy" }){
	const [form] = Form.useForm()
	const dispatch = useDispatch()
	const productSelected = useSelector(selectProductSelected)
	const [product,setProduct] = useState(productSelected)

	useEffect(() => {
		form.setFieldsValue(productSelected)
	},[productSelected,form])

	const handleFile = (e) => {
		form.setFieldsValue({...product,image:e})
		setProduct({...product,image:e})
		return false
	}
	const handle = () => {
		form.validateFields().then((values) => {
			form.submit()
			let obj = form.getFieldsValue()
			let productx = {
				id:obj.id,
				name:obj.name,
				image:product.image,
				options:obj.options.map((item) => {
					if(item.id){
						return {
							name:item.name,
							price:Number(removeChar(item.price,',')),
							weight:Number(removeChar(item.weight,',')),
							quantity:Number(removeChar(item.quantity,',')),
							importPrice:Number(removeChar(item.importPrice,',')),
							id:item.id
						}
					}
					return {
						name:item.name,
						price:Number(removeChar(item.price,',')),
						weight:Number(removeChar(item.weight,',')),
						quantity:Number(removeChar(item.quantity,',')),
						importPrice:Number(removeChar(item.importPrice,',')),
					}
				})
			}
			dispatch(updateProduct({
				id:productx.id,
				data:productx
			}))
			onCancel()
		}).catch(console.log)
		
		
	}
	return (
		<Modal open={visible} title={title} onOk={handle} cancelText={cancelText} onCancel={onCancel} width={1500}>
			<Form form={form} layout="vertical" onSubmitCapture={console.log} >
				<Form.Item name="id" className='hidden'>
					<Input type="hidden" />
				</Form.Item>
				<Form.Item name="name" label="Tên sản phẩm" rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm' }]}>
					<Input name="name" minLength={1} />
				</Form.Item>
				<Form.Item name="code" label="Mã sản phẩm" rules={[{ required: true, message: 'Vui lòng nhập mã sản phẩm' }]}>
					<Input readOnly name="code" minLength={1} />
				</Form.Item>
					<Form.Item  name="image" label="Hình ảnh sản phẩm"  className='w50' noStyle rules={[{ required: false, message: 'Vui lòng upload hình ảnh sản phẩm' }]} >
						<div className="w50 mcenter">
							<Upload.Dragger  name="image" maxCount={1} beforeUpload={handleFile}  accept="image/*"  multiple={false} className='w50' showUploadList={true}>
								<p className="ant-upload-drag-icon">
									<InboxOutlined />
								</p>
								<p className="ant-upload-text">Nhấp vào để upload hình ảnh sản phẩm</p>
								<p className="ant-upload-hint">*Chỉ hỗ trợ file hình ảnh*</p>
							</Upload.Dragger>
						</div>
				</Form.Item>
				<br></br>
				<Form.List name="options" className="flex">
					{(fields, { add, remove }) => (
						<>
							{fields.map(({ key, name, index, ...restField }) => (
								<div className='row between' key={key}>
									<Form.Item>
										<Input name={[name, 'id']} type='hidden' />
									</Form.Item>
									<Form.Item
										key={1}
										label="Phiên bản"
										name={[name, 'name']}
										className='w20'
										rules={[{ required: true, message: 'Vui lòng nhập tên phiên bản' }]}
									>
										<Input placeholder="Tên phiên bản" />
									</Form.Item>
									<Form.Item
										key={2}
										label="Giá nhập sản phẩm"
										name={[name, 'importPrice']}
										className='w20'
										rules={[{ required: true, message: 'Vui lòng nhập giá nhập sản phẩm' }]}
									>
										<InputNumber min={0} className='w100' name='importPrice' formatter={coverPrice().toVND} parser={coverPrice().toNumber} addonAfter="vnd" />
									</Form.Item>
									<Form.Item
										key={2}
										label="Giá sản phẩm"
										name={[name, 'price']}
										className='w20'
										rules={[{ required: true, message: 'Vui lòng nhập giá sản phẩm' }]}
									>
										<InputNumber min={0} className='w100' name='price' formatter={coverPrice().toVND} parser={coverPrice().toNumber} addonAfter="vnd" />
									</Form.Item>
									<Form.Item
										key={3}
										label="Khối lượng"
										name={[name, 'weight']}
										className='w20'
										rules={[{ required: true, message: 'Vui lòng nhập khối lượng sản phẩm' }]}
									>
										<InputNumber min={0} className='w100' name='weight' formatter={coverPrice().toVND} parser={coverPrice().toNumber} addonAfter="gram" />
									</Form.Item>
									<Form.Item
										key={4}
										label="Số lượng"
										name={[name, 'quantity']}
										className='w15'
									>
										<InputNumber min={0} className='w100' name='quantity'  addonAfter="Sản phẩm" defaultValue={0} />
									</Form.Item>
									<Form.Item>
										<AiOutlineMinusCircle size={20} color='red' className="dynamic-delete-button"  onClick={()=>remove(name)} />
									</Form.Item>
								</div>
							))}
							<Form.Item>
								<Button type="dashed" className='w100' onClick={() => add()} icon={<PlusOutlined />}>
									Thêm phiên bản
								</Button>
							</Form.Item>
						</>
					)}
				</Form.List>
			</Form>
		</Modal>
	)
}