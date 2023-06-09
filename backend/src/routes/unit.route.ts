import { Router } from 'express';
import { UnitController } from '~/controllers';
import { verifyToken } from '~/middleware';
const router = Router();

router.get('/', UnitController.getUnitByType);
router.get('/:id', UnitController.getUnitById);
router.post('/', verifyToken, UnitController.createUnit);

export default router;
