/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - rate
 *         - voters
 *         - price
 *         - stock
 *         - category
 *         - subCategory
 *         - companyId
 *         - coverPoster
 *         - sidePosters
 *       properties:
 *         id:
 *           type: string
 *           example: UUID_232l8%^&*
 *         name:
 *           type: string
 *           example: shoe  
 *         description:
 *           type: string
 *           example: this is a shoe 
 *         rate:
 *           type: number
 *           example: 10
 *         voters:
 *           type: number
 *           example: 10
 *         price:
 *           type: number
 *           example: 10
 *         stock:
 *           type: number
 *           example: 1
 *         category:
 *           type: string
 *           example: shoes
 *         subCategory:
 *           type: string
 *           example: sneakers
 *         companyId:
 *           type: string
 *           example: UUID_232l8%^&*
 *         coverPoster:
 *           type: string
 *           example: shoes.jpg
 *         sidePosters:
 *           type: array
 *           example: [shoes.jpg, shoes.jpg]
 *
 */
export { };
